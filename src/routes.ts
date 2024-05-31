export const authRoutes = [
	"/auth/login",
	"/auth/register",
	"/auth/error",
	"/auth/new-verification",
	"/auth/reset",
	"/auth/new-password"
];
export const publicRoutes = ["/", ...authRoutes];
export const apiAuthPrefix = "/api/auth";
export const DEFAULT_LOGIN_REDIRECT = "/settings";
