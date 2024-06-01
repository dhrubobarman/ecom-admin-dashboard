"use client";
import { resetPassword } from "@/actions/auth";
import LoginRegisterWrapper from "@/components/auth/LoginRegisterWrapper";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { ResetPasswordSchema, resetPasswordSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { FaSpinner } from "react-icons/fa6";

export const ResetForm = () => {
	const [isPending, startTransition] = useTransition();
	const [error, setError] = useState<string | undefined>("");
	const [success, setSuccess] = useState<string | undefined>("");

	const form = useForm<ResetPasswordSchema>({
		resolver: zodResolver(resetPasswordSchema),
		defaultValues: {
			email: ""
		}
	});

	const handleSubmit = async (values: ResetPasswordSchema) => {
		startTransition(() => {
			resetPassword(values).then((data) => {
				if (data?.error) {
					toast({
						title: data.error,
						variant: "destructive"
					});
					setError(data?.error);
				}
				if (data?.message) {
					setSuccess(data?.message);
					toast({
						title: data.message
					});
				}
			});
		});
	};

	return (
		<LoginRegisterWrapper
			headerLabel="Reset"
			description="Forgot your password? No worries! We'll help you reset it."
			backButtonHref="/auth/login"
			backButtonLable="Back to login"
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
					</div>
					<FormError message={error} onClose={() => setError("")} />
					<FormSuccess message={success} onClose={() => setSuccess("")} />
					<Button disabled={isPending} className="mt-4 w-full" type="submit">
						Send reset email
						{isPending && <FaSpinner className="ml-2 animate-spin" />}
					</Button>
				</form>
			</Form>
		</LoginRegisterWrapper>
	);
};
