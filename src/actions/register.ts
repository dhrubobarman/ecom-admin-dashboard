"use server";

import { RegisterSchema, registerSchema } from "@/schemas";
import bcrypt from "bcryptjs";
import db from "@/lib/prismadb";
import { getUserByEmail } from "@/data/user";

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
	const hashPassword = await bcrypt.hash(password, 10);

	await db.user.create({
		data: {
			email,
			name,
			password: hashPassword
		}
	});

	//! Send varification email
	//! Send welcome email
	return {
		message: "User account created"
	};
};
