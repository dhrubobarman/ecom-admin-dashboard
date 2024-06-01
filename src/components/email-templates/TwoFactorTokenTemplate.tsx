import { User } from "@prisma/client";
import { headers } from "next/headers";
import React from "react";

type EmailTemplateProps = {
	user: User;
	token: string;
};

export const TwoFactorTokenTemplate = ({ user, token }: EmailTemplateProps) => {
	return (
		<div>
			<h1>Hi, {user.name}!</h1>
			<p>Your One time password,</p>
			<span
				style={{
					display: "block",
					borderRadius: "8px",
					background: "cyan",
					maxWidth: "fit-content",
					padding: "5px"
				}}
				className="mx-auto block rounded-md bg-blue-300 p-3"
			>
				{token}
			</span>
		</div>
	);
};
