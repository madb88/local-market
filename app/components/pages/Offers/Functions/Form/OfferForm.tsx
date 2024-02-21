"use client";

import { createOfferAction } from "@/app/actions/offers/createOfferAction";
import { updateOfferAction } from "@/app/actions/offers/updateOfferAction";
import { Button } from "@/app/components/ui/atoms/button";
import { Input as AtomInput } from "@/app/components/ui/atoms/input";
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
import { Checkbox, Input, Select, SelectItem, Spinner, Textarea } from "@nextui-org/react";
import { ImageIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { type UploadFileResponse } from "uploadthing/client";
import { z } from "zod";
import ImageList from "../../../Companies/Functions/Form/ImageList";
import { type FormData } from "./FormData";

export default function OfferForm({ categoryName, data }: FormData) {
	const router = useRouter();
	const [images, setImages] = useState<UploadFileResponse<{ uploadedFile: string }>[]>([]);
	const [imageUpload, setImageUpload] = useState(false);

	const categories = [
		{ key: "elektronika", value: "elektronika", label: "Elektronika" },
		{ key: "dom", value: "dom", label: "Dom" },
		{ key: "ogrod", value: "ogrod", label: "Ogród" },
	];

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
		image: z.string(),
		messanger: z.boolean(),
		whatsapp: z.boolean(),
		email: z.boolean(),
		categoryName: z.string(),
	});

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: data && data.name ? data.name : "",
			description: data && data.description ? data.description : "",
			messanger: data && data.contact_options?.messanger ? data.contact_options.messanger : false,
			email: data && data.contact_options?.email ? data.contact_options.email : false,
			whatsapp: data && data.contact_options?.whatsapp ? data.contact_options.whatsapp : false,
			image: data && data.image ? data.image : "",
			categoryName: data && data.category_name ? data.category_name : categoryName,
		},
	});

	useEffect(() => {
		if (data) {
			if (data.image_object) {
				setImages(data.image_object as UploadFileResponse<{ uploadedFile: string }>[]);
			}
		}
	}, [data]);

	useEffect(() => {
		if (form.formState.isSubmitSuccessful) {
			form.reset();
			router.back();
		}
	}, [form.formState, form.reset, form]);

	useBeforeUnload(
		form.formState.isDirty,
		"Po opuszczeniu strony stracisz niezapisane dane w formularzu",
	);

	async function onSubmit(values: z.infer<typeof formSchema>) {
		const offerData = { ...values, imageObject: images[0] ? [images[0]] : [] };
		if (data) {
			const { error, message } = await updateOfferAction(data.id, offerData);
			if (error) {
				return toast.error(supabaseErrorCode[message].message, { duration: 6000 });
			}

			return toast.success(`Oferta ${data.name} została zaktualizowana`, {
				closeButton: true,
				duration: 3000,
			});
		} else {
			const { error } = await createOfferAction(offerData);
			if (error) {
				return toast.error(`${error.message}`, { duration: 6000 });
			}
		}

		return toast.success("Nowa oferta została dodana, i oczekuję na akceptację", {
			closeButton: true,
			duration: 3000,
		});
	}

	const removeImage = (key: string) => {
		const newImages = images.filter((image) => image.key !== key);
		setImages(newImages);
	};

	return (
		<div className="grid h-full grid-cols-1 gap-10 md:grid-cols-2 ">
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
					<div className="">
						<div className="space-y-8 pt-10">
							<FormField
								control={form.control}
								name="name"
								render={({ field }) => (
									<FormItem>
										<FormControl>
											<Input
												label="Nazwa Firmy"
												labelPlacement="outside"
												placeholder="Nazwa Firmy"
												{...field}
												isRequired
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="description"
								render={({ field }) => (
									<FormItem>
										<FormControl>
											<Textarea
												label="Opis działalności firmy"
												labelPlacement="outside"
												placeholder="Opis"
												{...field}
												className="resize-y"
												cols={100}
												isRequired
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<div className="flex flex-col gap-2">
								<div className="flex gap-2">
									<FormLabel>Opcje Kontaktu</FormLabel>
								</div>
								<div className="flex gap-5">
									<Controller
										control={form.control}
										name="email"
										render={({ field: { onChange, value } }) => (
											<Checkbox onChange={onChange} isSelected={value}>
												Email
											</Checkbox>
										)}
									></Controller>
									<Controller
										control={form.control}
										name="messanger"
										render={({ field: { onChange, value } }) => (
											<Checkbox onChange={onChange} isSelected={value}>
												Messanger
											</Checkbox>
										)}
									></Controller>
									<Controller
										control={form.control}
										name="whatsapp"
										render={({ field: { onChange, value } }) => (
											<Checkbox onChange={onChange} isSelected={value}>
												Whatsapp
											</Checkbox>
										)}
									></Controller>
								</div>
								<FormDescription>
									Udostępnij odpowiednie formy kontaktu z tobą, widoczne na stronie z ofertą.
									Informacje pochodzą z twojego profilu.
								</FormDescription>
							</div>
							<div className="flex flex-col gap-2">
								<Controller
									control={form.control}
									name="categoryName"
									render={({ field, fieldState, formState }) => (
										<Select
											{...field}
											items={categories}
											label="Kategoria"
											placeholder="Wybierz kategorię"
											className="max-w-xs"
											isInvalid={fieldState.invalid}
											errorMessage={formState.errors.categoryName?.message}
											defaultSelectedKeys={[categoryName]}
										>
											{(category) => <SelectItem key={category.value}>{category.label}</SelectItem>}
										</Select>
									)}
								></Controller>
							</div>

							<FormField
								control={form.control}
								name="image"
								render={({ field }) => (
									<FormItem>
										<FormControl>
											<AtomInput type="hidden" placeholder="" {...field} />
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
										form.setValue("image", res[0].url);
										setImages(res);
									}
									setImageUpload(false);
								}}
								onUploadError={() => {
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
			<div className="">
				{images.length > 0 ? (
					<ImageList images={images} removeImage={removeImage} />
				) : (
					<span className="flex h-60 justify-center align-middle">
						{imageUpload ? (
							<Spinner size="lg" label="Ładuje zdjęcie" labelColor="primary" />
						) : (
							<ImageIcon size={44} />
						)}
					</span>
				)}
			</div>
		</div>
	);
}
