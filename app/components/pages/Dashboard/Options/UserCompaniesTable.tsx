"use client";

import { setCompanyForDeleteAction } from "@/app/actions/companies/deleteCompanyAction";
import { type CompanyType } from "@/lib/supabase/serverAppRouter";
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
import DeleteModal from "../Functions/DeleteModal";
import { default as UseTablePagination } from "../UseTablePagination";
import { statusCode } from "../utils/statusCode";

export type DashboardUserCompaniesTableT = {
	headers: string[];
	data: [] | null | CompanyType[];
	favoriteData?: boolean;
};

export default function UserCompaniesTable({
	headers,
	data,
	favoriteData,
}: DashboardUserCompaniesTableT) {
	const { items, pagination } = UseTablePagination(data);

	const tableData = items ? (items as CompanyType[]) : [];
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
								{element.status ? (
									<Chip color={statusCode[element.status].color}>
										<p className="first-letter:uppercase">{statusCode[element.status].label}</p>
									</Chip>
								) : (
									"Brak statusu"
								)}
							</TableCell>
							<TableCell>
								{element.created_at
									? format(new Date(element.created_at), "dd/MM/yyyy")
									: "Brak daty"}
							</TableCell>

							<TableCell>
								<div className="relative flex items-center gap-2">
									<Tooltip content="Zobacz ofertę">
										<span className="cursor-pointer text-lg text-default-400 active:opacity-50">
											<Link href={`/companies/${element.id}`}>
												<EyeIcon />
											</Link>
										</span>
									</Tooltip>
									<Tooltip content="Edytuj ofertę">
										<span className="cursor-pointer text-lg text-default-400 active:opacity-50">
											<Link href={`/companies/${element.id}/edit`}>
												<EditIcon />
											</Link>
										</span>
									</Tooltip>
									{!favoriteData && element.status !== "delete" && (
										<DeleteModal
											element={element}
											title="Czy jesteś pewien ze chcesz usunąć swoja firmę?"
											actionFunction={setCompanyForDeleteAction}
											tooltipText="Skasuj firmę"
											toastMessage="Firma dodana do usunięcia"
										/>
									)}
								</div>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			) : (
				<TableBody emptyContent={favoriteData ? "Brak obserwowanych firm" : "Brak firm"}>
					{[]}
				</TableBody>
			)}
		</Table>
	);
}
