import NextAuth, { DefaultSession } from "next-auth";
import authConfig from "@/auth.config";
import { JWT } from "next-auth/jwt";
import { PrismaAdapter } from "@auth/prisma-adapter";
import db from "@/lib/prismadb";
import { getUserById } from "@/data/user";
import { UserRole } from "@prisma/client";
import { getTwoFactorConfirmationByUserId } from "@/data/two-factor-confirmation";

declare module "next-auth" {
	/**
	 * Returned by `auth`, `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
	 */
	interface Session {
		user: {
			role: UserRole;
			id: string;
			isTwoFactorEnabled: boolean;
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
		isTwoFactorEnabled: boolean;
	}
}
declare module "next-auth/jwt" {
	/** Returned by the `jwt` callback and `auth`, when using JWT sessions */
	interface JWT {
		/** OpenID ID Token */
		role: UserRole;
		isTwoFactorEnabled: boolean;
	}
}

export const { auth, handlers, signIn, signOut } = NextAuth({
	events: {
		async linkAccount({ user }) {
			await db.user.update({
				where: {
					id: user.id
				},
				data: {
					emailVerified: new Date()
				}
			});
		}
	},
	callbacks: {
		async signIn({ user, credentials, account, profile, email }) {
			if (account?.provider !== "credentials") return true;
			if (!user.id) return false;
			// prevent sign in without verification
			if (!user.emailVerified) return false;
			if (user.isTwoFactorEnabled) {
				const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(
					user.id
				);
				if (!twoFactorConfirmation) return false;

				await db.twoFactorConfirmation.delete({
					where: { id: twoFactorConfirmation.id }
				});
			}
			return true;
		},
		async session({ session, token }) {
			if (session.user && token.sub) {
				session.user.id = token.sub;
			}
			if (token.role && session.user) {
				session.user.role = token.role;
			}
			if (session.user) {
				session.user.name = token.name;
				session.user.email = token.email || "";
				session.user.isTwoFactorEnabled = token.isTwoFactorEnabled || false;
			}
			return session;
		},
		async jwt({ token, user }) {
			if (!token.sub) return token;
			if (user && user.role) {
				token.role = user.role;
				token.email = user.email;
				token.name = user.name;
				token.isTwoFactorEnabled = user.isTwoFactorEnabled;
			}

			// const existingUser = await getUserById(token.sub);
			// if (!existingUser) return token;
			// token.role = existingUser.role;
			return token;
		}
	},
	pages: {
		signIn: "/auth/login",
		newUser: "/auth/register",
		error: "/auth/error"
	},
	adapter: PrismaAdapter(db),
	session: { strategy: "jwt" },
	...authConfig
});
