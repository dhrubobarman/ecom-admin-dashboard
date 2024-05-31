import React, { ReactNode } from "react";
import {
	Card,
	CardHeader,
	CardFooter,
	CardTitle,
	CardDescription,
	CardContent
} from "@/components/ui/card";
import { SocialLoginIcons } from "@/components/auth/SocialLoginIcons";
import { BackButton } from "@/components/auth/BackButton";

type LoginRegistarProps = {
	children: ReactNode;
	headerLabel: string;
	description?: ReactNode;
	backButtonLable: string;
	backButtonHref: string;
	showSocial?: boolean;
};

const LoginRegisterWrapper = ({
	backButtonHref,
	backButtonLable,
	children,
	headerLabel,
	showSocial,
	description
}: LoginRegistarProps) => {
	return (
		<Card className="w-full max-w-[500px]">
			<CardHeader>
				<CardTitle className="text-center text-3xl font-bold">
					{headerLabel}
				</CardTitle>
				{description && (
					<CardDescription className=" text-center">
						{description}
					</CardDescription>
				)}
			</CardHeader>
			<CardContent>{children}</CardContent>
			{showSocial && <SocialLoginIcons />}
			<CardFooter className="flex justify-between">
				<BackButton label={backButtonLable} href={backButtonHref} />
			</CardFooter>
		</Card>
	);
};

export default LoginRegisterWrapper;
