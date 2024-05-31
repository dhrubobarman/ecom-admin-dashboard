"use client";
import { newVerification } from "@/actions/auth";
import LoginRegisterWrapper from "@/components/auth/LoginRegisterWrapper";
import { useSearchParams } from "next/navigation";
import React, { useCallback, useEffect, useState, useTransition } from "react";
import { FaSpinner } from "react-icons/fa6";
import { BsExclamationTriangle } from "react-icons/bs";
import { BsCheckCircle } from "react-icons/bs";
import { toast } from "@/components/ui/use-toast";

export const NewVerificationForm = () => {
	const searchParams = useSearchParams();
	const token = searchParams.get("token");
	const email = searchParams.get("email");
	const name = searchParams.get("name");
	const [message, setMessage] = useState(
		"Please wait while we verify your email"
	);
	const [success, setSuccess] = useState(false);
	const [error, setError] = useState("");

	const onSubmit = useCallback(async () => {
		if (success || error) return;
		if (!token) {
			setError("Missing Token");
			return;
		}
		newVerification(token)
			.then((data) => {
				if (data.error) {
					toast({ title: data.error, variant: "destructive" });
					setError(data.error);
				}
				if (data.message) {
					setSuccess(true);
					toast({ title: data.message });
					setMessage(data.message);
				}
			})
			.catch((error) => {
				setError("Something went wrong!");
			});
	}, [token, success, error]);

	useEffect(() => {
		onSubmit();
	}, [onSubmit]);

	return (
		<LoginRegisterWrapper
			headerLabel={`${name && token ? "Welcome " + name : "Auth"}`}
			description={name && token && <>Confirming your verification</>}
			backButtonLable="Back to Login"
			backButtonHref="/auth/login"
		>
			<div className="text-center">
				<p
					className={`text-md mb-4 ${error ? "text-red-500" : "text-muted-foreground"}`}
				>
					{error && !success ? error : message}
					{!error && email && <span className="block text-sm">{email}</span>}
				</p>
				{!success && !error ? (
					<FaSpinner
						size={45}
						className=" mx-auto block animate-spin text-primary"
					/>
				) : null}
				{error && !success ? (
					<BsExclamationTriangle
						size={45}
						className=" mx-auto block text-red-500"
					/>
				) : success ? (
					<BsCheckCircle
						size={45}
						className=" mx-auto block text-emerald-500"
					/>
				) : null}
			</div>
		</LoginRegisterWrapper>
	);
};
