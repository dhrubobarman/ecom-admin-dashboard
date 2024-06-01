import db from "@/lib/prismadb";

export const getTwoFactorTokenByEmail = async (email: string) => {
	try {
		const twoFactorToken = db.twoFactorToken.findFirst({
			where: { email }
		});
		return twoFactorToken;
	} catch (error) {
		return null;
	}
};

export const getTwoFactorTokenByToken = async (token: string) => {
	try {
		const twoFactorToken = db.twoFactorToken.findUnique({
			where: { token }
		});
		return twoFactorToken;
	} catch (error) {
		return null;
	}
};
