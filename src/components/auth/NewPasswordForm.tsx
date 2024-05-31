"use client";
import { newPassword, resetPassword } from "@/actions/auth";
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
import { newPasswordSchema, NewPasswordSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FaSpinner } from "react-icons/fa6";

export const NewPasswordForm = () => {
	const searchParams = useSearchParams();
	const token = searchParams.get("token");
	const email = searchParams.get("email");
	const name = searchParams.get("name");

	const [isPending, startTransition] = useTransition();
	const [error, setError] = useState<string | undefined>("");
	const [success, setSuccess] = useState<string | undefined>("");
	const [isPasswordVisible, setIsPasswordVisible] = useState(false);

	const toggleViewPassword = () => {
		setIsPasswordVisible((prev) => !prev);
	};

	const form = useForm<NewPasswordSchema>({
		resolver: zodResolver(newPasswordSchema),
		defaultValues: {
			password: ""
		}
	});

	const handleSubmit = async (values: NewPasswordSchema) => {
		startTransition(() => {
			newPassword(values, token).then((data) => {
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
			description="Forgot your password?"
			backButtonHref="/auth/login"
			backButtonLable="Back to login"
		>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
					<div className="space-y-4">
						<FormField
							control={form.control}
							name="password"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Enter new password</FormLabel>
									<div className="flex gap-2">
										<Input
											disabled={isPending}
											placeholder="Password"
											type={isPasswordVisible ? "text" : "password"}
											{...field}
										/>
										<Button
											size={"icon"}
											type="button"
											variant={"outline"}
											className=" flex-shrink-0"
											onClick={toggleViewPassword}
										>
											{isPasswordVisible ? (
												<FaEyeSlash className="size-4" />
											) : (
												<FaEye className="size-4" />
											)}
										</Button>
									</div>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<FormError message={error} onClose={() => setError("")} />
					<FormSuccess message={success} onClose={() => setSuccess("")} />
					<Button disabled={isPending} className="mt-4 w-full" type="submit">
						Reset password
						{isPending && <FaSpinner className="ml-2 animate-spin" />}
					</Button>
				</form>
			</Form>
		</LoginRegisterWrapper>
	);
};
