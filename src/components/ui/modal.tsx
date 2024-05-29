"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ReactNode } from "react";

type ModalProps = {
  title: ReactNode;
  description: ReactNode;
  isOpen: boolean;
  onClose: () => void;
  children?: ReactNode;
};

const Modal = ({
  description,
  isOpen,
  onClose,
  title,
  children,
}: ModalProps) => {
  if (!isOpen) return null;
  const onChange = (open: boolean): void => {
    if (!open) onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <div>{children}</div>
      </DialogContent>
    </Dialog>
  );
};

export { Modal };
