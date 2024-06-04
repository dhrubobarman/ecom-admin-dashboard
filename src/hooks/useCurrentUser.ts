import React, { useEffect } from "react";
import { useSession } from "next-auth/react";

export const useCurrentUser = () => {
	const session = useSession({
		required: true,
		onUnauthenticated: () => console.log("unAuth")
	});
	useEffect(() => {}, [session]);
	return session.data?.user;
};
