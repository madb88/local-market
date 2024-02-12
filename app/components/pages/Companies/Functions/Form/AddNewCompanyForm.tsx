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
import { UploadButton } from "@/lib/uploadthing";
import { zodResolver } from "@hookform/resolvers/zod";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { UploadFileResponse } from "uploadthing/client";
import { z } from "zod";

export default function AddNewCompanyForm() {
	const [images, setImages] = useState<
		UploadFileResponse<{
			UploadedFile: string;
		}>[]
	>([]);

	const title = <>{images.length ? <p>Zdjęcie dodane</p> : null}</>;

	const imageList = (
		<div className="flex justify-center">
			{title}
			<ul>
				{images.map((image) => (
					<li className={"mt-2"} key={image.key}>
						{image.url}
						{image.name}
					</li>
				))}
			</ul>
		</div>
	);

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
		images: z.string(),
	});

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: "",
			description: "",
			images: "",
		},
	});

	useEffect(() => {
		if (form.formState.isSubmitSuccessful) {
			form.reset();
			redirect("/companies");
		}
	}, [form.formState, form.reset]);

	async function onSubmit(values: z.infer<typeof formSchema>) {
		const { error } = await createCompanyAction(values);
		if (error) {
			console.log(error.message);
			return toast.error(`${error.message}`, { duration: 6000 });
		}

		return toast.success("Nowa firma została dodana, i oczekuję na akceptację", {
			closeButton: true,
			duration: 3000,
		});
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
					<FormField
						control={form.control}
						name="images"
						render={({ field }) => (
							<FormItem>
								<FormLabel>ZDJECIE</FormLabel>
								<FormControl>
									<Input placeholder="" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<UploadButton
						endpoint="imageUploader"
						onClientUploadComplete={(res: UploadFileResponse<{ uploadedFile: string }>[]) => {
							console.log("Files: ", res);
							toast.success("Zdjęcie dodane", { duration: 1000 });
							if (res) {
								form.setValue("images", res[0].url);
							}
						}}
						onUploadError={(error: Error) => {
							toast.error("Wystąpił błąd poczas dodawania zdjęcia");
							console.log(`ERROR! ${error.message}`);
						}}
					/>
					{imageList}
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
