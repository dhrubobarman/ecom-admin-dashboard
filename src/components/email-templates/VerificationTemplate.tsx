import { User } from "@prisma/client";
import { headers } from "next/headers";
import React from "react";

type EmailTemplateProps = {
	user: User;
	token: string;
};

export const VerificationTemplate = ({ user, token }: EmailTemplateProps) => {
	const headersList = headers();
	const host = headersList.get("host") || "";
	const referer = headersList.get("referer") || "http://localhost:3000";

	const newOrigin = `${referer.split("://")[0]}://${host}`;

	const confirmationLink = `${newOrigin}/auth/new-verification?token=${token}&email=${user.email}&name=${user.name}`;

	return (
		<div>
			<h1>Welcome, {user.name}!</h1>
			<p>Click on the link below to verify your account</p>
			<a href={confirmationLink}>{confirmationLink}</a>
		</div>
	);
};
