"use client";
import React from "react";
import { useCurrentUser } from "@/hooks/useCurrentUser";
const Testpage = () => {
	const user = useCurrentUser();
	return <div>{JSON.stringify(user)}</div>;
};

export default Testpage;
