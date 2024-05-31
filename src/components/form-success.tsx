import { BsCheckCircle } from "react-icons/bs";
import { MdClose } from "react-icons/md";

type FormSuccessProps = {
	message?: string;
	onClose?: () => void;
};

import React from "react";
import { Button } from "@/components/ui/button";

export const FormSuccess = ({ message, onClose }: FormSuccessProps) => {
	if (!message) return null;

	return (
		<div className=" flex items-center justify-between gap-2 rounded-md bg-emerald-500/15 p-3 text-sm text-emerald-500">
			<div className="flex items-center gap-2">
				<BsCheckCircle className="size-4" />
				{message}
			</div>
			{onClose && (
				<Button
					size={"icon"}
					variant={"ghost"}
					onClick={onClose}
					className="h-6 w-6"
				>
					<MdClose />
				</Button>
			)}
		</div>
	);
};
