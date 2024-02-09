"use client";

import { createCompanyAction } from "@/app/actions/createCompanyAction";
import { Button } from "@/app/components/ui/atoms/button";
import { Input } from "@/app/components/ui/atoms/input";
import { Textarea } from "@/app/components/ui/atoms/textarea";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/app/components/ui/molecules/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function AddNewCompanyForm() {
	const formSchema = z.object({
		name: z
			.string()
			.min(1, {
				message: "Nazwa musi mieć minimum 1 znak",
			})
			.max(50, {
				message: "Nazwa moze mieć maksymalnie 50 znaków",
			}),
		description: z
			.string()
			.min(1, {
				message: "Opis musi mieć minimum 1 znak",
			})
			.max(120, {
				message: "Opis moze mieć maksymalnie 120 znaków",
			}),
	});

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: "",
			description: "",
		},
	});

	async function onSubmit(values: z.infer<typeof formSchema>) {
		const { message, error } = await createCompanyAction(values);
		console.log(message, error);
	}

	return (
		<>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
					<FormField
						control={form.control}
						name="name"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Nazwa</FormLabel>
								<FormControl>
									<Input placeholder="Nazwa Firmy" {...field} />
								</FormControl>
								<FormDescription>Nazwa firmy.</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="description"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Opis</FormLabel>
								<FormControl>
									<Textarea placeholder="Opis" {...field} />
								</FormControl>
								<FormDescription>Opis tego czym zajmuje się firma.</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button
						disabled={
							form.formState.isSubmitting || !form.formState.isDirty || !form.formState.isValid
						}
						type="submit"
					>
						Submit
					</Button>
				</form>
			</Form>
		</>
	);
}
