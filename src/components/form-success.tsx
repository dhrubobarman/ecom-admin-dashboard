import { BsCheckCircle } from "react-icons/bs";

type FormSuccessProps = {
	message?: string;
};

import React from "react";

export const FormSuccess = ({ message }: FormSuccessProps) => {
	if (!message) return null;

	return (
		<div className=" flex items-center gap-2 rounded-md bg-emerald-500/15 p-3 text-sm text-emerald-500">
			<BsCheckCircle className="size-4" />
			{message}
		</div>
	);
};
