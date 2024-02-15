"use client";

import { createCompanyAction } from "@/app/actions/createCompanyAction";
import { updateCompanyAction } from "@/app/actions/updateCompanyAction";
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
import { supabaseErrorCode } from "@/lib/helpers/errorCodeTranslations";
import { useBeforeUnload } from "@/lib/hooks/useBeforeUnload";
import { UploadButton } from "@/lib/uploadthing";
import { zodResolver } from "@hookform/resolvers/zod";
import { Image } from "lucide-react";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { type UploadFileResponse } from "uploadthing/client";
import { z } from "zod";
import { type FormData } from "./FormData";
import ImageList from "./ImageList";

export default function CompanyForm({ data }: FormData) {
	const [images, setImages] = useState<UploadFileResponse<{ uploadedFile: string }>[]>([]);
	const [imageUpload, setImageUpload] = useState(false);

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
			.max(300, {
				message: "Opis moze mieć maksymalnie 300 znaków",
			}),
		images: z.string(),
	});

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: data && data.name ? data.name : "",
			description: data && data.description ? data.description : "",
			images: data && data.images ? data.images : "",
		},
	});

	useEffect(() => {
		if (data) {
			if (data.image_object) {
				setImages(data.image_object as UploadFileResponse<{ uploadedFile: string }>[]);
			}
		}
	}, []);

	useEffect(() => {
		if (form.formState.isSubmitSuccessful) {
			form.reset();
			redirect("/companies");
		}
	}, [form.formState, form.reset, form]);

	useBeforeUnload(
		form.formState.isDirty,
		"Po opuszczeniu strony stracisz niezapisane dane w formularzu",
	);

	async function onSubmit(values: z.infer<typeof formSchema>) {
		const companyData = { ...values, imageObject: [images[0]] };

		if (data) {
			const { error, message } = await updateCompanyAction(data.id, companyData);
			if (error) {
				return toast.error(supabaseErrorCode[message].message, { duration: 6000 });
			}

			return toast.success(`Firma ${data.name} została zaktualizowana`, {
				closeButton: true,
				duration: 3000,
			});
		} else {
			const { error } = await createCompanyAction(companyData);
			if (error) {
				return toast.error(`${error.message}`, { duration: 6000 });
			}
		}

		return toast.success("Nowa firma została dodana, i oczekuję na akceptację", {
			closeButton: true,
			duration: 3000,
		});
	}

	const removeImage = (key: string) => {
		const newImages = images.filter((image) => image.key !== key);
		setImages(newImages);
	};

	return (
		<div className="grid h-full grid-cols-1 gap-10 md:grid-cols-2">
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
					<div className="">
						<div>
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
											<Textarea placeholder="Opis" {...field} className="resize-y" cols={100} />
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
										<FormControl>
											<Input type="hidden" placeholder="" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<UploadButton
								content={{
									button({ ready }) {
										if (ready) return <div>Załaduj zdjęcie</div>;
										return "Ładuje się";
									},
									allowedContent({ ready, isUploading }) {
										if (!ready) return "Sprawdzam uprawnienia";
										if (isUploading) return "Zdjęcie jest wrzucane";
										return `Rozmiar zdjęcia: 4mb`;
									},
								}}
								endpoint="imageUploader"
								onClientUploadComplete={(res: UploadFileResponse<{ uploadedFile: string }>[]) => {
									toast.success("Zdjęcie dodane", { duration: 1000 });
									if (res) {
										form.setValue("images", res[0].url);
										setImages(res);
									}
									setImageUpload(false);
								}}
								onUploadError={(error: Error) => {
									toast.error("Wystąpił błąd poczas dodawania zdjęcia");
									setImageUpload(false);
								}}
								onUploadProgress={() => {
									setImageUpload(true);
								}}
							/>

							<Button
								disabled={
									form.formState.isSubmitting || (!data && !form.formState.isDirty) || imageUpload
								}
								type="submit"
								size="lg"
							>
								{data ? <p className="text-base">Edytuj</p> : <p className="text-base">Dodaj</p>}
							</Button>
						</div>
					</div>
				</form>
			</Form>
			<div>
				{images.length > 0 ? (
					<ImageList images={images} removeImage={removeImage} />
				) : (
					<span className="h-6/6 pt-50 flex justify-center ">
						<Image size={44} />
					</span>
				)}
			</div>
		</div>
	);
}
