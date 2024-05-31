import { getPasswordResetTokenByEmail } from "@/data/password-reset-token";
import { getVerificationTokenByEmail } from "@/data/verification-token";
import db from "@/lib/prismadb";
import { v4 as uuid } from "uuid";

export const generateVerificationToken = async (email: string) => {
	const token = uuid();
	const expires = new Date(new Date().getTime() + 3600 * 1000);
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
	const expires = new Date(new Date().getTime() + 3600 * 1000);
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
