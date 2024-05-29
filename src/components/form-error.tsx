import { BsExclamationTriangle } from "react-icons/bs";

type FormErrorProps = {
	message?: string;
};

import React from "react";

export const FormError = ({ message }: FormErrorProps) => {
	if (!message) return null;

	return (
		<div className=" flex items-center gap-2 rounded-md bg-destructive/15 p-3 text-sm text-destructive">
			<BsExclamationTriangle className="size-4" />
			{message}
		</div>
	);
};
