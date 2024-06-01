"use client";

import { Modal } from "@/components/ui/modal";
import { useStoreModal } from "@/hooks/use-store-modal";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
	Form,
	FormItem,
	FormLabel,
	FormControl,
	FormDescription,
	FormMessage,
	FormField
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
	name: z.string().min(1, "Store name is required")
});
type FormSchema = z.infer<typeof formSchema>;

export const StoreModal = () => {
	const { isOpen, onClose } = useStoreModal();

	const form = useForm<FormSchema>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: ""
		}
	});

	const onSubmit = async (values: FormSchema) => {
		console.log(values);
	};

	return (
		<Modal
			title="Create Store"
			description={`Add a new store to managa products and categories`}
			isOpen={isOpen}
			onClose={onClose}
		>
			<div className=" space-y-4 py-2 pb-4">
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)}>
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Name</FormLabel>
									<FormControl>
										<Input {...field} placeholder="Name of the store" />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<div className="flex w-full items-center justify-end gap-2 pt-6">
							<Button variant={"outline"} onClick={onClose}>
								Cancel
							</Button>
							<Button type="submit">Continue</Button>
						</div>
					</form>
				</Form>
			</div>
		</Modal>
	);
};
