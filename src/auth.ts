import NextAuth, { DefaultSession } from "next-auth";
import authConfig from "@/auth.config";
import { JWT } from "next-auth/jwt";
import { PrismaAdapter } from "@auth/prisma-adapter";
import db from "@/lib/prismadb";
import { getUserById } from "@/data/user";
import { UserRole } from "@prisma/client";

declare module "next-auth" {
	/**
	 * Returned by `auth`, `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
	 */
	interface Session {
		user: {
			role: UserRole;
			id: string;
			/**
			 * By default, TypeScript merges new interface properties and overwrites existing ones.
			 * In this case, the default session user properties will be overwritten,
			 * with the new ones defined above. To keep the default session user properties,
			 * you need to add them back into the newly declared interface.
			 */
		} & DefaultSession["user"];
	}
	interface User {
		role: UserRole;
		emailVerified: Date | null;
	}
}
declare module "next-auth/jwt" {
	/** Returned by the `jwt` callback and `auth`, when using JWT sessions */
	interface JWT {
		/** OpenID ID Token */
		role: UserRole;
	}
}

export const { auth, handlers, signIn, signOut } = NextAuth({
	callbacks: {
		async signIn({ user, credentials, account, profile, email }) {
			if (!credentials) return true;
			if (!user.id) return false;
			if (!user.emailVerified) return false;
			// const existingUser = await getUserById(user.id);
			// if (
			// 	!existingUser ||
			// 	(!existingUser.emailVerified && existingUser.password)
			// )
			// 	return false;
			return true;
		},
		async session({ session, token }) {
			if (session.user && token.sub) {
				session.user.id = token.sub;
			}
			if (token.role && session.user) {
				session.user.role = token.role;
			}
			return session;
		},
		async jwt({ token, user }) {
			if (!token.sub) return token;
			if (user && user.role) {
				token.role = user.role;
			}
			// const existingUser = await getUserById(token.sub);
			// if (!existingUser) return token;
			// token.role = existingUser.role;
			return token;
		}
	},
	pages: {
		signIn: "/auth/signin",
		newUser: "/auth/register"
	},
	adapter: PrismaAdapter(db),
	session: { strategy: "jwt" },
	...authConfig
});
