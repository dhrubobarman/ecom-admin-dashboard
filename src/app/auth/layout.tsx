import React, { ReactNode } from "react";

const AuthLayout = ({ children }: { children: ReactNode }) => {
	return (
		<main className="flex min-h-screen items-center justify-center bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-primary to-secondary py-10">
			{children}
		</main>
	);
};

export default AuthLayout;
