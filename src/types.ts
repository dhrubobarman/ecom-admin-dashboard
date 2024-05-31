import { z } from "zod";

const envVariables = z.object({
	DATABASE_URL: z.string(),
	GITHUB_ID: z.string(),
	GITHUB_SECRET: z.string(),
	GOOGLE_ID: z.string(),
	GOOGLE_SECRET: z.string(),
	RESEND_API_KEY: z.string()
});

envVariables.parse(process.env);

declare global {
	namespace NodeJS {
		interface ProcessEnv extends z.infer<typeof envVariables> {}
	}
}

export type SignInPageErrorParam =
	| "Signin"
	| "OAuthSignin"
	| "OAuthCallbackError"
	| "OAuthCreateAccount"
	| "EmailCreateAccount"
	| "Callback"
	| "OAuthAccountNotLinked"
	| "EmailSignin"
	| "CredentialsSignin"
	| "SessionRequired"
	| "AccessDenied";
