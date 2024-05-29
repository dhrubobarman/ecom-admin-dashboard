"use client";
import React, { useState, useTransition } from "react";
import LoginRegisterWrapper from "@/components/auth/LoginRegisterWrapper";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { LoginSchema, loginSchema } from "@/schemas";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { login } from "@/actions/login";

export const LoginForm = () => {
	const [isPending, startTransition] = useTransition();
	const [error, setError] = useState<string | undefined>("");
	const [success, setSuccess] = useState<string | undefined>("");
	const form = useForm<LoginSchema>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: "",
			password: ""
		}
	});

	const handleSubmit = async (values: LoginSchema) => {
		startTransition(() => {
			login(values).then((data) => {
				setError(data?.error);
			});
		});
	};

	return (
		<LoginRegisterWrapper
			headerLabel="Login"
			backButtonHref="/auth/register"
			backButtonLable="Don't have an account?"
			description="Welcome back"
			showSocial
		>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
					<div className="space-y-4">
						<FormField
							control={form.control}
							name="email"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Email</FormLabel>
									<FormControl>
										<Input
											disabled={isPending}
											placeholder="johndoe@mail.com"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="password"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Password</FormLabel>
									<FormControl>
										<Input
											disabled={isPending}
											placeholder="*********"
											type="password"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<FormError message={error} />
					<FormSuccess message={success} />
					<Button disabled={isPending} className="mt-4 w-full" type="submit">
						Login
					</Button>
				</form>
			</Form>
		</LoginRegisterWrapper>
	);
};
