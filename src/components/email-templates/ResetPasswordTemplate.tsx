import { User } from "@prisma/client";
import { headers } from "next/headers";
import React from "react";

type EmailTemplateProps = {
	user: User;
	token: string;
};

export const ResetPasswordTemplate = ({ user, token }: EmailTemplateProps) => {
	const headersList = headers();
	const host = headersList.get("host") || "";
	const referer = headersList.get("referer") || "http://localhost:3000";

	const newOrigin = `${referer.split("://")[0]}://${host}`;

	const passwordResetLink = `${newOrigin}/auth/new-password?token=${token}&email=${user.email}&name=${user.name}`;

	return (
		<div>
			<h1>Hi, {user.name}!</h1>
			<p>Click on the link below to reest your password</p>
			<a href={passwordResetLink}>{passwordResetLink}</a>
		</div>
	);
};
