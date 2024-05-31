import { SignInPageErrorParam } from "@/types";
import bcrypt from "bcryptjs";

export function signInErrorMessages(errorType: SignInPageErrorParam): string {
	if (!errorType) return "";
	switch (errorType) {
		case "Signin":
			return "Oops! Something went wrong during sign-in. Please try again later.";
		case "OAuthSignin":
			return "Uh-oh! There was an issue with OAuth sign-in. Double-check your credentials and give it another shot.";
		case "OAuthCallbackError":
			return "OAuth callback failed. Make sure your authorization is valid and try again.";
		case "OAuthCreateAccount":
			return "Creating an account via OAuth hit a snag. Try a different method or contact support.";
		case "EmailCreateAccount":
			return "Creating an account encountered an error. Verify your email address and try again.";
		case "Callback":
			return "Oops! Something went wrong during the callback process. Please try again.";
		case "OAuthAccountNotLinked":
			return "Email already in use with different provider!. Head to your account settings to link it.";
		case "EmailSignin":
			return "Error signing in with email. Check your credentials and give it another go.";
		case "CredentialsSignin":
			return "Invalid credentials. Double-check your username and password.";
		case "AccessDenied":
			return "Access denied. You don't have permission to access this resource.";
		case "SessionRequired":
			return "Sign-in requires an active session. Log in first, then try again.";
		default:
			return "An unknown error occurred. Please try again or contact support.";
	}
}

export const hashPassword = async (password: string) => {
	return await bcrypt.hash(password, 10);
};
export const verifyPassword = async (
	password: string,
	hashPassword: string
) => {
	return await bcrypt.compare(password, hashPassword);
};
