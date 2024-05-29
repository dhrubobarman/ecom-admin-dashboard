import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type BackButtonProps = {
  label: string;
  href: string;
};

export const BackButton = ({ label, href }: BackButtonProps) => {
  return (
    <Button variant={"link"} size="sm" className=" font-normal w-full" asChild>
      <Link href={href}>{label}</Link>
    </Button>
  );
};
