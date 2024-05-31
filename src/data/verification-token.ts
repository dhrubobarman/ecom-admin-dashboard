import db from "@/lib/prismadb";

export const getVerificationTokenByEmail = async (email: string) => {
	try {
		const verificationToken = db.verificationToken.findFirst({
			where: { email }
		});
		return verificationToken;
	} catch (error) {
		return null;
	}
};

export const getVerificationTokenByToken = async (token: string) => {
	try {
		const verificationToken = db.verificationToken.findUnique({
			where: { token }
		});
		return verificationToken;
	} catch (error) {
		return null;
	}
};
