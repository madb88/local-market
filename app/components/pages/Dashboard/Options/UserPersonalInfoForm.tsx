"use client";
import { type userData } from "@/app/(home)/dashboard/user/page";
import { updateUser } from "@/app/actions/users";
import { Input as AtomInput } from "@/app/components/ui/atoms/input";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormMessage,
} from "@/app/components/ui/molecules/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { useBeforeUnload } from "react-use";
import { toast } from "sonner";
import { z } from "zod";

export default function UserPersonalInforForm({ user }: { user: userData }) {
	const formSchema = z.object({
		messengerId: z.string(),
		number: z.string(),
		id: z.string(),
		email: z
			.string()
			.min(1, { message: "To pole musi być wypełnione" })
			.email("To nie jest poprawny email"),
		firstName: z.string().min(1, { message: "To pole musi być wypełnione" }),
		lastName: z.string().min(1, { message: "To pole musi być wypełnione" }),
	});

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			messengerId: user?.messengerId,
			number: user?.number,
			id: user?.id,
			email: user?.email,
			firstName: user?.firstName,
			lastName: user?.lastName,
		},
	});

	useBeforeUnload(
		form.formState.isDirty,
		"Po opuszczeniu strony stracisz niezapisane dane w formularzu",
	);

	async function onSubmit(values: z.infer<typeof formSchema>) {
		const userData = { ...values };
		const { message, code } = await updateUser(userData);
		if (code === "error") {
			return toast.error(`${message}`, { duration: 6000 });
		}

		return toast.success("Użytkownik zaktualizowany", {
			closeButton: true,
			duration: 3000,
		});
	}

	return (
		<div className="md:w-6/12">
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
					<FormField
						control={form.control}
						name="lastName"
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<Input
										label="Nazwisko"
										labelPlacement="outside"
										placeholder="Nazwisko"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="firstName"
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<Input label="Imię" labelPlacement="outside" placeholder="Imię" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="messengerId"
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<Input
										label="Facebook Id"
										labelPlacement="outside"
										placeholder="Facebook Id"
										{...field}
									/>
								</FormControl>
								<FormDescription>
									Potrzebny jeśli chcesz, udostępniać kontakt przez messengera w swoich ofertach
								</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="number"
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<Input
										label="Number telefonu"
										labelPlacement="outside"
										placeholder="Numer"
										{...field}
									/>
								</FormControl>
								<FormDescription>
									Potrzebny jeśli chcesz, udostępniać kontakt przez whatsappa w swoich ofertach
								</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<Input label="Email" labelPlacement="outside" placeholder="Email" {...field} />
								</FormControl>
								<FormDescription>
									Potrzebny jeśli chcesz, udostępniać kontakt przez email w swoich ofertach
								</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="id"
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<AtomInput type="hidden" placeholder="" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button
						disabled={form.formState.isSubmitting || !form.formState.isDirty}
						type="submit"
						size="lg"
						aria-label="Wyslij formularz"
						color="primary"
					>
						Wyslij
					</Button>
				</form>
			</Form>
		</div>
	);
}
