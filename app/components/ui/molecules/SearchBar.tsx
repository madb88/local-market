"use client";

import { Form, FormControl, FormField, FormItem } from "@/app/components/ui/molecules/form";
import { categories, type CategoriesT } from "@/app/utils/categoriesData";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input, Select, SelectItem } from "@nextui-org/react";
import { Diamond, Hammer, Search, SearchIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function SearchBar() {
	const router = useRouter();
	const searchCategories: CategoriesT[] = [
		...categories,
		{ key: "all", value: "all", label: "Wszytkie Kategorie", icon: <Diamond /> },
		{ key: "company", value: "company", label: "Firmy", icon: <Hammer /> },
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
		<div className="md:w-5/6">
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
												base: "w-full ",
												mainWrapper: "",
												input: "text-small",
												inputWrapper:
													" font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
											}}
											onFocus={() => window.scrollTo(0, 0)}
											placeholder="Szukaj"
											size="sm"
											startContent={<Search size={18} />}
											type="search"
											aria-label="Szukana fraza"
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
										base: "h-10",
										mainWrapper: "h-full",
									}}
									size="sm"
									defaultSelectedKeys={["all"]}
									aria-label="Gdzie chcesz szukac"
								>
									{(category) => (
										<SelectItem
											key={category.value}
											startContent={category.icon}
											textValue={category.label}
										>
											<span className="hidden sm:inline-block sm:text-small">{category.label}</span>
										</SelectItem>
									)}
								</Select>
							)}
						></FormField>
					</div>
					<div className="col-span-1">
						<Button
							type="submit"
							aria-label="szukaj"
							size={"lg"}
							isIconOnly
							color="primary"
							className="bg-gradient-to-tr from-orange-700 to-yellow-500 text-white shadow-lg"
						>
							<SearchIcon />
						</Button>
					</div>
				</form>
			</Form>
		</div>
	);
}
