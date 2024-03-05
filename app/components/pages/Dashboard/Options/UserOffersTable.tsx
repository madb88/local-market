"use client";

import { setOfferForDeleteAction } from "@/app/actions/offers/deleteOfferAction";
import { type OfferType } from "@/lib/supabase/serverAppRouter";
import {
	Chip,
	Table,
	TableBody,
	TableCell,
	TableColumn,
	TableHeader,
	TableRow,
	Tooltip,
} from "@nextui-org/react";
import { format } from "date-fns";
import { EditIcon, EyeIcon } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import DeleteOfferButton from "../Functions/DeleteOfferButton";
import { default as UseTablePagination } from "../UseTablePagination";
import { statusCode } from "../utils/statusCode";

export const revalidate = 1;
export type DashboardUserOffersTableT = {
	headers: string[];
	data: [] | null | OfferType[];
	favoriteData?: boolean;
};

export default function UserOffersTable({
	headers,
	data,
	favoriteData,
}: DashboardUserOffersTableT) {
	const { items, pagination } = UseTablePagination(data);
	const tableData = items ? (items as OfferType[]) : [];

	return (
		<Table
			aria-label="Tabela z twoimi ofertami"
			bottomContent={<div className="flex w-full justify-center">{pagination}</div>}
		>
			<TableHeader>
				{headers.map((header) => (
					<TableColumn key={header}>{header}</TableColumn>
				))}
			</TableHeader>
			{tableData.length !== 0 ? (
				<TableBody>
					{tableData?.map((element) => (
						<TableRow key={element.id}>
							<TableCell>{element.name}</TableCell>

							<TableCell>
								<p className="first-letter:uppercase">{element.category_name}</p>
							</TableCell>
							<TableCell>
								{element.status ? (
									<Chip color={statusCode[element.status].color}>
										<p className="first-letter:uppercase">{statusCode[element.status].label}</p>
									</Chip>
								) : (
									"Brak statusu"
								)}
							</TableCell>
							<TableCell>{format(new Date(element.created_at), "dd/MM/yyyy")}</TableCell>

							<TableCell>
								<div className="relative flex items-center gap-2">
									<Tooltip content="Zobacz ofertę">
										<span className="cursor-pointer text-lg text-default-400 active:opacity-50">
											<Link href={`/offers/${element.category_name}/${element.id}`}>
												<EyeIcon />
											</Link>
										</span>
									</Tooltip>
									{!favoriteData && (
										<Tooltip content="Edytuj ofertę">
											<span className="cursor-pointer text-lg text-default-400 active:opacity-50">
												<Link href={`/offers/${element.category_name}/${element.id}/edit`}>
													<EditIcon />
												</Link>
											</span>
										</Tooltip>
									)}
									{!favoriteData && (
										<Tooltip color="danger" content="Usuń ofertę">
											<form
												action={async () => {
													const { error } = await setOfferForDeleteAction(element.id, {
														status: "delete",
													});
													if (!error) return toast.success("Oferta dodana do usunięcia");

													return toast.error(error?.message);
												}}
											>
												<DeleteOfferButton />
											</form>
										</Tooltip>
									)}
								</div>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			) : (
				<TableBody emptyContent={favoriteData ? "Brak obserwowanych ofert" : "Brak ofert"}>
					{[]}
				</TableBody>
			)}
		</Table>
	);
}
