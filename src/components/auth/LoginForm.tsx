"use client";
import { login } from "@/actions/auth";
import LoginRegisterWrapper from "@/components/auth/LoginRegisterWrapper";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
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
import { toast } from "@/components/ui/use-toast";
import { signInErrorMessages } from "@/lib/helpers";
import { LoginSchema, loginSchema } from "@/schemas";
import { SignInPageErrorParam } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { FaSpinner } from "react-icons/fa6";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Link from "next/link";
import {
	InputOTP,
	InputOTPGroup,
	InputOTPSlot
} from "@/components/ui/input-otp";

export const LoginForm = () => {
	const searchParams = useSearchParams();
	const urlError = searchParams.get("error") as SignInPageErrorParam;

	const urlErrorMsg = signInErrorMessages(urlError);

	const [isPending, startTransition] = useTransition();
	const [error, setError] = useState<string | undefined>("");
	const [success, setSuccess] = useState<string | undefined>("");
	const [isPasswordVisible, setIsPasswordVisible] = useState(false);
	const [showTowFactor, setShowTwoFactor] = useState(false);

	const toggleViewPassword = () => {
		setIsPasswordVisible((prev) => !prev);
	};
	const form = useForm<LoginSchema>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: "",
			password: "",
			otp: ""
		}
	});

	console.log(form.getValues());

	const handleSubmit = async (values: LoginSchema) => {
		startTransition(() => {
			login(values)
				.then((data) => {
					if (!data) return;
					if (data.error) {
						form.reset();
						toast({
							title: data.error,
							variant: "destructive"
						});
						setError(data?.error);
					}
					if (data.message) {
						setSuccess(data?.message);
						toast({
							title: data.message
						});
					}
					if (data.twoFactor) {
						setShowTwoFactor(true);
					}
				})
				.catch((error) => {
					setError("Something went wrong!");
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
						<div className={`${showTowFactor ? " hidden" : ""}`}>
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
											<div className="flex gap-2">
												<Input
													disabled={isPending}
													placeholder="*********"
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
										</FormControl>
										<Button
											variant={"link"}
											asChild
											size={"sm"}
											className="px-0 font-normal"
										>
											<Link href="/auth/reset">Forgot password?</Link>
										</Button>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<div className={`${showTowFactor ? " " : "hidden"}`}>
							<FormField
								control={form.control}
								name="otp"
								render={({ field }) => (
									<FormItem>
										<FormLabel>One-Time Password</FormLabel>
										<FormControl>
											<InputOTP maxLength={6} {...field} disabled={isPending}>
												<InputOTPGroup>
													<InputOTPSlot index={0} />
													<InputOTPSlot index={1} />
													<InputOTPSlot index={2} />
													<InputOTPSlot index={3} />
													<InputOTPSlot index={4} />
													<InputOTPSlot index={5} />
												</InputOTPGroup>
											</InputOTP>
										</FormControl>
										<FormDescription>
											Please enter the one-time password sent to your email.
										</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
					</div>
					<FormError
						message={error || urlErrorMsg}
						onClose={() => setError("")}
					/>
					<FormSuccess message={success} onClose={() => setSuccess("")} />
					<Button disabled={isPending} className="mt-4 w-full" type="submit">
						{showTowFactor ? "Confirm" : "Login"}
						{isPending && <FaSpinner className="ml-2 animate-spin" />}
					</Button>
				</form>
			</Form>
		</LoginRegisterWrapper>
	);
};
