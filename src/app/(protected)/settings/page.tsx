"use client";
import React, { useEffect } from "react";
import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import { signOut, useSession } from "next-auth/react";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import Link from "next/link";

const Settings = () => {
	const data = useCurrentUser();

	return (
		<div>
			{JSON.stringify(data)}
			<Link href={"/settings/test"}>Test</Link>
			<Button onClick={() => signOut()}>Sign out</Button>
		</div>
	);
};
export default Settings;
