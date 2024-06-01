import { ResetPasswordTemplate } from "@/components/email-templates/ResetPasswordTemplate";
import { TwoFactorTokenTemplate } from "@/components/email-templates/TwoFactorTokenTemplate";
import { VerificationTemplate } from "@/components/email-templates/VerificationTemplate";
import { User } from "@prisma/client";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerificationEmail = async (user: User, token: string) => {
	const { data, error } = await resend.emails.send({
		from: "no-reply@dhrubojyotibarman.in",
		to: user.email!,
		subject: "Confirm your email",
		react: VerificationTemplate({ user, token })
	});

	if (error) {
		return { error: error.message };
	}
	return { message: "Verification email sent!" };
};

export const sendResetPasswordEmail = async (user: User, token: string) => {
	const { data, error } = await resend.emails.send({
		from: "no-reply@dhrubojyotibarman.in",
		to: user.email!,
		subject: "Reset your password",
		react: ResetPasswordTemplate({ user, token })
	});

	if (error) {
		return { error: error.message };
	}
	return { message: "Password reset link sent to your email!" };
};

export const sendTwoFactorTokenEmail = async (user: User, token: string) => {
	const { data, error } = await resend.emails.send({
		from: "no-reply@dhrubojyotibarman.in",
		to: user.email!,
		subject: "2FA Code",
		react: TwoFactorTokenTemplate({ user, token })
	});

	if (error) {
		return { error: error.message };
	}
	return { message: "2FA code sent to your email!" };
};
