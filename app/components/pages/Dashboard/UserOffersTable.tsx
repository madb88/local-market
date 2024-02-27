"use client";

import { OfferType } from "@/lib/supabase/serverAppRouter";
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
import { statusCode } from "./utils/statusCode";

export type DashboardTableT = {
	headers: string[];
	data: [] | null | OfferType[];
};

export default function UserOffersTable({ headers, data }: DashboardTableT) {
	return (
		<Table aria-label="Tabela z twoimi ofertami">
			<TableHeader>
				{headers.map((header) => (
					<TableColumn>{header}</TableColumn>
				))}
			</TableHeader>
			<TableBody>
				{data ? (
					data?.map((element) => (
						<TableRow key={element.id}>
							<TableCell>{element.name}</TableCell>

							<TableCell>
								<p className="first-letter:uppercase">{element.category_name}</p>
							</TableCell>
							<TableCell>
								{element.status ? (
									<Chip color={statusCode[element.status].color}>
										<p className="first-letter:uppercase">{element.status}</p>
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
									<Tooltip content="Edytuj ofertę">
										<span className="cursor-pointer text-lg text-default-400 active:opacity-50">
											<Link href={`/offers/${element.category_name}/${element.id}/edit`}>
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
					))
				) : (
					<TableRow>
						<TableCell colSpan={4}> Brak danych</TableCell>
					</TableRow>
				)}
			</TableBody>
		</Table>
	);
}
