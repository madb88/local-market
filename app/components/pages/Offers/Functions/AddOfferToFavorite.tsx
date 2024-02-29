"use client";
import { addOfferToFavoriteAction } from "@/app/actions/favorite/offers/addOfferToFavoriteAction";
import { deleteOfferFromFavoriteAction } from "@/app/actions/favorite/offers/deleteOfferFromFavoriteAction";
import { Input } from "@/app/components/ui/atoms/input";
import { Form, FormControl, FormField, FormItem } from "@/app/components/ui/molecules/form";
import { useUser } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Spinner, Tooltip } from "@nextui-org/react";
import { EyeIcon, EyeOff } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

export default function AddOfferToFavorite({
	offerId,
	isFavorite,
}: {
	offerId: number;
	isFavorite: boolean;
}) {
	const { user } = useUser();
	const [isFavoriteCheck, setIsFavoriteCheck] = useState<boolean>(isFavorite);
	const formSchema = z.object({
		id: z.number(),
	});

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: { id: offerId },
	});

	async function onSubmit(values: z.infer<typeof formSchema>) {
		if (isFavoriteCheck && user) {
			const offerData = { ...values, user_id: user.id };

			const { error } = await deleteOfferFromFavoriteAction(offerData);
			setIsFavoriteCheck(false);

			if (error) {
				setIsFavoriteCheck(true);

				return toast.error(`${error.message}`, { duration: 6000 });
			}
			return toast.info("Oferta została usnięta z obserwowanych", {
				closeButton: true,
				duration: 3000,
			});
		} else {
			const offerData = { ...values };

			const { error } = await addOfferToFavoriteAction(offerData);
			setIsFavoriteCheck(true);

			if (error) {
				setIsFavoriteCheck(false);

				return toast.error(`${error.message}`, { duration: 6000 });
			}
		}

		return toast.success("Oferta została dodana do obserwowanych", {
			closeButton: true,
			duration: 3000,
		});
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="">
				<FormField
					control={form.control}
					name="id"
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<Input type="hidden" placeholder="" {...field} />
							</FormControl>
						</FormItem>
					)}
				/>
				{form.formState.isSubmitting ? (
					<Spinner />
				) : (
					<Tooltip content="Dodaj do obserwowanych">
						<Button
							aria-label="Do obserwowanych"
							isIconOnly
							type="submit"
							disabled={form.formState.isSubmitting}
							className="shadow-lg"
							color="primary"
							variant="bordered"
						>
							{isFavoriteCheck ? <EyeIcon /> : <EyeOff />}
						</Button>
					</Tooltip>
				)}
			</form>
		</Form>
	);
}
