"use client";

import { setOfferForDeleteAction } from "@/app/actions/offers/deleteOfferAction";
import {
	Chip,
	Spinner,
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
import DeleteModal from "../Dashboard/Functions/DeleteModal";
import { statusCode } from "../Dashboard/utils/statusCode";
import UseAsyncTablePagination from "./UseAsyncTablePagination";

export const revalidate = 1;
export type DashboardUserOffersTableT = {
	headers: string[];
};

export default function AllUsersOffersTable({ headers }: DashboardUserOffersTableT) {
	const { items, pagination, loadingState } = UseAsyncTablePagination();
	const tableData = items ? items : [];

	return (
		<>
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
					<TableBody
						items={tableData ?? []}
						loadingContent={<Spinner />}
						loadingState={loadingState}
					>
						{(item) => (
							<TableRow key={item.id}>
								<TableCell>{item.name}</TableCell>

								<TableCell>
									<p className="first-letter:uppercase">{item.category_name}</p>
								</TableCell>
								<TableCell>
									{item.status ? (
										<Chip color={statusCode[item.status].color}>
											<p className="first-letter:uppercase">{statusCode[item.status].label}</p>
										</Chip>
									) : (
										"Brak statusu"
									)}
								</TableCell>
								<TableCell>{format(new Date(item.created_at), "dd/MM/yyyy")}</TableCell>

								<TableCell>
									<div className="relative flex items-center gap-2">
										{item.status !== "delete" && (
											<Tooltip content="Zobacz ofertę">
												<span className="cursor-pointer text-lg text-default-400 active:opacity-50">
													<Link href={`/offers/${item.category_name}/${item.id}`}>
														<EyeIcon />
													</Link>
												</span>
											</Tooltip>
										)}
										{item.status !== "delete" && (
											<Tooltip content="Edytuj ofertę">
												<span className="cursor-pointer text-lg text-default-400 active:opacity-50">
													<Link href={`/offers/${item.category_name}/${item.id}/edit`}>
														<EditIcon />
													</Link>
												</span>
											</Tooltip>
										)}
										{item.status !== "delete" && (
											<DeleteModal
												element={item}
												title="Czy jesteś pewien ze chcesz usunąć swoja ofertę?"
												actionFunction={setOfferForDeleteAction}
												tooltipText="Skasuj ofertę"
												toastMessage="Oferta dodana do usunięcia"
											/>
										)}
									</div>
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				) : (
					<TableBody emptyContent={"Brak ofert"}>{[]}</TableBody>
				)}
			</Table>
		</>
	);
}
