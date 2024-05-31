import LoginRegisterWrapper from "@/components/auth/LoginRegisterWrapper";
import { BsExclamationTriangle } from "react-icons/bs";

export const ErrorCard = () => {
	return (
		<LoginRegisterWrapper
			backButtonHref="/auth/login"
			backButtonLable="Back to login"
			headerLabel="Oops! Something went wrong"
			description="Please try again later."
		>
			<div className="flex items-center justify-center">
				<BsExclamationTriangle className="size-8 text-destructive" />
			</div>
		</LoginRegisterWrapper>
	);
};
