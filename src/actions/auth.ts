"use server";

import { signIn } from "@/auth";
import { getPasswordResetTokenByToken } from "@/data/password-reset-token";
import { getUserByEmail } from "@/data/user";
import { getVerificationTokenByToken } from "@/data/verification-token";
import {
	hashPassword,
	signInErrorMessages,
	verifyPassword
} from "@/lib/helpers";
import { sendResetPasswordEmail, sendVerificationEmail } from "@/lib/mail";
import db from "@/lib/prismadb";
import {
	generatePasswordResetToken,
	generateVerificationToken
} from "@/lib/tokens";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import {
	LoginSchema,
	NewPasswordSchema,
	RegisterSchema,
	ResetPasswordSchema,
	loginSchema,
	newPasswordSchema,
	registerSchema,
	resetPasswordSchema
} from "@/schemas";
import { SignInPageErrorParam } from "@/types";
import { AuthError } from "next-auth";

export const login = async (values: LoginSchema) => {
	const validatedFields = loginSchema.safeParse(values);
	if (!validatedFields.success) {
		return {
			error: "Invalid fields!",
			message: ""
		};
	}

	const { email, password } = validatedFields.data;
	const dbUser = await getUserByEmail(email);

	if (!dbUser || !dbUser.email || !dbUser.password) {
		return { error: "Invalid credentials!", message: "" };
	}

	if (!dbUser.emailVerified) {
		const verificationToken = await generateVerificationToken(dbUser.email);
		const isPasswordValid = await verifyPassword(password, dbUser.password);
		if (!isPasswordValid) return { error: "Invalid credentials!" };
		return sendVerificationEmail(dbUser, verificationToken.token);
	}

	try {
		await signIn("credentials", {
			email,
			password,
			redirectTo: DEFAULT_LOGIN_REDIRECT
		});
	} catch (error) {
		if (error instanceof AuthError) {
			return {
				error: signInErrorMessages(error.type as SignInPageErrorParam)
			};
		}
		throw error;
	}
};

export const register = async (values: RegisterSchema) => {
	const validatedFields = registerSchema.safeParse(values);
	if (!validatedFields.success) {
		return {
			error: "Invalid fields!"
		};
	}

	const { email, password, name } = validatedFields.data;

	const existingUser = await getUserByEmail(email);

	if (existingUser) {
		return { error: "User already exists!" };
	}
	const hashedPassword = await hashPassword(password);

	const user = await db.user.create({
		data: {
			email,
			name,
			password: hashedPassword
		}
	});

	const verificationToken = await generateVerificationToken(email);
	//! Send varification email
	return sendVerificationEmail(user, verificationToken.token);
};

export const newVerification = async (token: string) => {
	const existingToken = await getVerificationTokenByToken(token);
	if (!existingToken) return { error: "Invalid token!" };
	const hasExpired = new Date(existingToken.expires) < new Date();
	if (hasExpired) return { error: "Token has expired!" };

	const existingUser = await getUserByEmail(existingToken.email);
	if (!existingUser) return { error: "User not found!" };
	await db.user.update({
		where: { id: existingUser.id },
		data: { emailVerified: new Date(), email: existingToken.email }
	});
	await db.verificationToken.delete({
		where: {
			id: existingToken.id
		}
	});
	return { message: "Email verified successfully!" };
};

export const resetPassword = async (values: ResetPasswordSchema) => {
	const validatedFields = resetPasswordSchema.safeParse(values);
	if (!validatedFields.success) return { error: "Invalid email!" };
	const { email } = validatedFields.data;
	const user = await getUserByEmail(email);
	if (!user) return { error: "User not found!", message: "" };

	const passwordResetToken = await generatePasswordResetToken(email);
	return await sendResetPasswordEmail(user, passwordResetToken.token);
};

export const newPassword = async (
	values: NewPasswordSchema,
	token: string | null
) => {
	if (!token) return { error: "Missing token!", message: "" };
	const validatedFields = newPasswordSchema.safeParse(values);
	if (!validatedFields.success) return { error: "Invalid fields!" };
	const { password } = validatedFields.data;
	const existingToken = await getPasswordResetTokenByToken(token);
	if (!existingToken) return { error: "Invalid token!" };
	const hasExpired = new Date(existingToken.expires) < new Date();
	if (hasExpired) return { error: "Token has expired!" };
	const existingUser = await getUserByEmail(existingToken.email);
	if (!existingUser) return { error: "User not found!", message: "" };
	const hashedPassword = await hashPassword(password);
	await db.user.update({
		where: { id: existingUser.id },
		data: { password: hashedPassword }
	});
	await db.passwordResetToken.delete({
		where: {
			id: existingToken.id
		}
	});
	return { message: "Password updated successfully!" };
};
