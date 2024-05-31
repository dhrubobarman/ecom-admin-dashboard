import { BsExclamationTriangle } from "react-icons/bs";
import { MdClose } from "react-icons/md";

type FormErrorProps = {
	message?: string;
	onClose?: () => void;
};

import { Button } from "@/components/ui/button";

export const FormError = ({ message, onClose }: FormErrorProps) => {
	if (!message) return null;

	return (
		<div className=" flex items-center justify-between gap-2 rounded-md bg-destructive/15 p-3 text-sm text-destructive">
			<div className="flex items-center gap-2">
				<BsExclamationTriangle className="size-4" />
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
