"use client";

import { setOfferForDeleteAction } from "@/app/actions/offers/deleteOfferAction";
import { type OfferType } from "@/lib/supabase/serverAppRouter";
import {
	Button,
	Chip,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
	Table,
	TableBody,
	TableCell,
	TableColumn,
	TableHeader,
	TableRow,
	Tooltip,
	useDisclosure,
} from "@nextui-org/react";
import { format } from "date-fns";
import { EditIcon, EyeIcon, Trash } from "lucide-react";
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
	const { isOpen, onOpen, onOpenChange } = useDisclosure();
	const { items, pagination } = UseTablePagination(data);
	const tableData = items ? (items as OfferType[]) : [];

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
										{element.status !== "delete" && (
											<Tooltip content="Zobacz ofertę">
												<span className="cursor-pointer text-lg text-default-400 active:opacity-50">
													<Link href={`/offers/${element.category_name}/${element.id}`}>
														<EyeIcon />
													</Link>
												</span>
											</Tooltip>
										)}
										{!favoriteData && element.status !== "delete" && (
											<Tooltip content="Edytuj ofertę">
												<span className="cursor-pointer text-lg text-default-400 active:opacity-50">
													<Link href={`/offers/${element.category_name}/${element.id}/edit`}>
														<EditIcon />
													</Link>
												</span>
											</Tooltip>
										)}
										{!favoriteData && element.status !== "delete" && (
											<>
												<Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
													<ModalContent>
														{(onClose) => (
															<>
																<ModalHeader className="flex flex-col gap-1">
																	Czy jesteś pewien ze chcesz usunąć swoja ofertę?
																</ModalHeader>
																<ModalBody>
																	<form
																		action={async () => {
																			const { error } = await setOfferForDeleteAction(element.id, {
																				status: "delete",
																				image:
																					element.image_object && element.image_object[0]
																						? element.image_object[0].key
																						: "",
																			});
																			if (!error) {
																				onClose();
																				return toast.success("Oferta dodana do usunięcia", {
																					closeButton: true,
																					duration: 3000,
																				});
																			}
																			onClose();
																			return toast.error(error?.message, {
																				closeButton: true,
																				duration: 3000,
																			});
																		}}
																	>
																		<ModalFooter>
																			<Button color="danger" variant="light" onPress={onClose}>
																				Zamknij
																			</Button>
																			<DeleteOfferButton />
																		</ModalFooter>
																	</form>
																</ModalBody>
															</>
														)}
													</ModalContent>
												</Modal>
												<Tooltip color="danger" content="Usuń ofertę">
													<Button
														color="danger"
														aria-label="Skasuj oferte"
														isIconOnly
														onClick={onOpen}
													>
														<Trash />
													</Button>
												</Tooltip>
											</>
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
		</>
	);
}
