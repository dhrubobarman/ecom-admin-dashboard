import crypto from "crypto";
import { getPasswordResetTokenByEmail } from "@/data/password-reset-token";
import { getVerificationTokenByEmail } from "@/data/verification-token";
import db from "@/lib/prismadb";
import { v4 as uuid } from "uuid";
import { getTwoFactorTokenByEmail } from "@/data/two-factor-token";

export const generateTwoFactorToken = async (email: string) => {
	const token = crypto.randomInt(100_000, 1_000_000).toString();
	const expires = new Date(new Date().getTime() + 10 * 60 * 1000);
	const existingToken = await getTwoFactorTokenByEmail(email);
	const data = { token, expires, email };

	if (existingToken) {
		return await db.twoFactorToken.update({
			where: { id: existingToken.id },
			data
		});
	}
	return await db.twoFactorToken.create({
		data
	});
};

export const generateVerificationToken = async (email: string) => {
	const token = uuid();
	const expires = new Date(new Date().getTime() + 10 * 60 * 1000);
	const existingToken = await getVerificationTokenByEmail(email);

	const data = { token, expires, email };

	if (existingToken) {
		return await db.verificationToken.update({
			where: { id: existingToken.id },
			data
		});
	}
	return await db.verificationToken.create({
		data
	});
};

export const generatePasswordResetToken = async (email: string) => {
	const token = uuid();
	const expires = new Date(new Date().getTime() + 10 * 60 * 1000);
	const existingToken = await getPasswordResetTokenByEmail(email);

	const data = { token, expires, email };

	if (existingToken) {
		return await db.passwordResetToken.update({
			where: { id: existingToken.id },
			data
		});
	}
	return await db.passwordResetToken.create({
		data
	});
};
