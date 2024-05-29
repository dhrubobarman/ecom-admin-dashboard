"use client";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { useStoreModal } from "@/hooks/use-store-modal";
import { useState } from "react";

export default function Home() {
  const onOpen = useStoreModal((state) => state.onOpen);

  return (
    <div className="">
      <Button onClick={() => onOpen()}>Open Model</Button>
    </div>
  );
}
