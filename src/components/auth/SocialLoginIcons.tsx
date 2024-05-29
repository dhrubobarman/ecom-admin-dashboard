"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { signIn } from "next-auth/react";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

export const SocialLoginIcons = () => {
	const handleClick = (provider: "google" | "github") => {
		signIn(provider, {
			callbackUrl: DEFAULT_LOGIN_REDIRECT
		});
	};
	return (
		<div className="flex w-full items-center gap-2 p-6 pt-0">
			<Button
				className="w-full"
				size={"lg"}
				variant={"outline"}
				onClick={() => handleClick("google")}
			>
				<FcGoogle className="size-5" />
			</Button>
			<Button
				className="w-full"
				size={"lg"}
				variant={"outline"}
				onClick={() => handleClick("github")}
			>
				<FaGithub className="size-5" />
			</Button>
		</div>
	);
};
