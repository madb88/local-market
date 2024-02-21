"use client";

import { Form, FormControl, FormField, FormItem } from "@/app/components/ui/molecules/form";
import { categories } from "@/app/utils/categoriesData";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input, Select, SelectItem } from "@nextui-org/react";
import { Search, SearchIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function SearchBar() {
	const router = useRouter();
	const searchCategories = [
		...categories,
		{ value: "all", label: "Wszytkie Kategorie" },
		{ value: "company", label: "Firmy" },
	];

	const formSchema = z.object({
		searchKey: z.string(),
		searchFilter: z.string(),
	});

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			searchFilter: "all",
		},
	});

	const onSubmit = (values: z.infer<typeof formSchema>) => {
		router.push(`/listing?searchKeyWord=${values.searchKey}&filter=${values.searchFilter}`);
	};
	return (
		<div className="w-full">
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-6 grid-rows-1">
					<div className="col-span-3">
						<FormField
							control={form.control}
							name="searchKey"
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<Input
											classNames={{
												base: "w-full h-10",
												mainWrapper: "h-full",
												input: "text-small",
												inputWrapper:
													"h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
											}}
											placeholder="Szukaj"
											size="sm"
											startContent={<Search size={18} />}
											type="search"
											{...field}
										/>
									</FormControl>
								</FormItem>
							)}
						/>
					</div>
					<div className="col-span-2 col-start-4">
						<FormField
							control={form.control}
							name="searchFilter"
							render={({ field }) => (
								<Select
									{...field}
									items={searchCategories}
									placeholder="Szukaj w"
									classNames={{
										base: " h-10",
										mainWrapper: "h-full",
									}}
									defaultSelectedKeys={["all"]}
								>
									{(category) => <SelectItem key={category.value}>{category.label}</SelectItem>}
								</Select>
							)}
						></FormField>
					</div>
					<div className="col-span-1">
						<Button type="submit" size="md" isIconOnly aria-label="szukaj" color="primary">
							<SearchIcon />
						</Button>
					</div>
				</form>
			</Form>
		</div>
	);
}
