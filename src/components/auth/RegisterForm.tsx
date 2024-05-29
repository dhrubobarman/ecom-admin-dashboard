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
import { RegisterSchema, registerSchema } from "@/schemas";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { register } from "@/actions/register";

export const RegisterForm = () => {
	const [isPending, startTransition] = useTransition();
	const [error, setError] = useState<string | undefined>("");
	const [success, setSuccess] = useState<string | undefined>("");
	const form = useForm<RegisterSchema>({
		resolver: zodResolver(registerSchema),
		defaultValues: {
			email: "",
			password: "",
			name: ""
		}
	});

	const handleSubmit = async (values: RegisterSchema) => {
		startTransition(() => {
			register(values).then((data) => {
				setError(data.error);
				setSuccess(data.message);
			});
		});
	};

	return (
		<LoginRegisterWrapper
			headerLabel="Register"
			backButtonHref="/auth/login"
			backButtonLable="Already have an account?"
			description="Create an account"
			showSocial
		>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
					<div className="space-y-4">
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Name</FormLabel>
									<FormControl>
										<Input
											disabled={isPending}
											placeholder="John Doe"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
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
											type="password"
											placeholder="*********"
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
						Create and account
					</Button>
				</form>
			</Form>
		</LoginRegisterWrapper>
	);
};
