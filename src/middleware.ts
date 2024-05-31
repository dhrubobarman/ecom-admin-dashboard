import NextAuth from "next-auth";
import authConfig from "@/auth.config";
import {
	DEFAULT_LOGIN_REDIRECT,
	apiAuthPrefix,
	publicRoutes,
	authRoutes
} from "@/routes";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
	const { nextUrl } = req;
	const isAuthenticated = !!req.auth;

	const isPublicRoute =
		publicRoutes.includes(nextUrl.pathname) ||
		nextUrl.pathname.startsWith(apiAuthPrefix);

	const isAuthRoute = authRoutes.includes(nextUrl.pathname);

	if (isAuthRoute && isAuthenticated) {
		return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
	}

	if (!isAuthenticated && !isPublicRoute) {
		return Response.redirect(new URL("/auth/login", nextUrl));
	}
});

export const config = {
	matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"]
};
