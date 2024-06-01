import db from "@/lib/prismadb";

export const getTwoFactorConfirmationByUserId = async (userId: string) => {
	try {
		const twoFactorConfirmation = db.twoFactorConfirmation.findUnique({
			where: { userId }
		});
		return twoFactorConfirmation;
	} catch (error) {
		return null;
	}
};
