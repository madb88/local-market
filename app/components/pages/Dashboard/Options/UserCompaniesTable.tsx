"use client";

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
import { EditIcon, EyeIcon, Trash } from "lucide-react";
import Link from "next/link";
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
									<Tooltip color="danger" content="Usuń ofertę">
										<span className="cursor-pointer text-lg text-danger active:opacity-50">
											<Trash />
										</span>
									</Tooltip>
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
