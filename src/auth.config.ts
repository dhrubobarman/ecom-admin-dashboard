import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import Creadentials from "next-auth/providers/credentials";
import type { NextAuthConfig } from "next-auth";
import { loginSchema } from "@/schemas";
import db from "@/lib/prismadb";
import { getUserByEmail } from "@/data/user";
import bcrypt from "bcryptjs";

export default {
	providers: [
		Creadentials({
			async authorize(creadentials) {
				const validatedFields = loginSchema.safeParse(creadentials);
				if (validatedFields.success) {
					const { email, password } = validatedFields.data;
					const user = await getUserByEmail(email);
					if (!user || !user.password) return null;
					const isPasswordValid = await bcrypt.compare(password, user.password);
					if (isPasswordValid) return user;
				}
				return null;
			}
		}),
		Google({
			clientId: process.env.GOOGLE_ID,
			clientSecret: process.env.GOOGLE_SECRET
		}),
		GitHub({
			clientId: process.env.GITHUB_ID,
			clientSecret: process.env.GITHUB_SECRET
		})
	]
} satisfies NextAuthConfig;
