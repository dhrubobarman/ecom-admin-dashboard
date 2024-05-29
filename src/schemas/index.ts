import { z } from "zod";

export const loginSchema = z.object({
	email: z.string().email({
		message: "Please enter a valid email"
	}),
	password: z.string().min(1, "Password is required")
});
export type LoginSchema = z.infer<typeof loginSchema>;

export const registerSchema = z.object({
	email: z.string().email({
		message: "Please enter a valid email"
	}),
	password: z.string().min(8, "Password has to be at least 8 characters long"),
	name: z.string().min(1, "Name is required")
});
export type RegisterSchema = z.infer<typeof registerSchema>;
