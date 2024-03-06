import DetailPageImage from "@/app/components/ui/molecules/DetailPageImage";
import { type OfferType } from "@/lib/supabase/serverAppRouter";
import { Card, CardBody, Chip, Divider } from "@nextui-org/react";
import { format } from "date-fns";
import { CameraOff } from "lucide-react";
import { revalidateTag } from "next/cache";
import ContactAuthor from "./ContactAuthor";
import OfferHeader from "./OfferHeader";

export default function Offer({ offer, isFavorite }: { offer: OfferType; isFavorite: boolean }) {
	revalidateTag("offer");
	return (
		<div className="flex flex-col gap-5">
			{offer ? (
				<OfferHeader
					categoryName={offer.category_name}
					name={offer.name}
					authorId={offer.user_id ? offer.user_id : null}
					offerId={offer.id}
					isFavorite={isFavorite}
				/>
			) : null}

			<div className="lg:grid-row-2 lg:grid">
				<div>
					<h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
						{offer.name}
					</h1>
				</div>
				<div>
					<div className="grid grid-cols-1 grid-rows-1 space-x-2 lg:grid-cols-2">
						<div className="flex flex-col gap-2">
							<Card>
								<CardBody>
									<div className="flex flex-row  gap-2">
										<div className="space-x-2">
											<span>Oferujący:</span>
											<Chip color="primary">
												{offer.author?.userInfo?.firstName} {offer.author?.userInfo?.lastName}
											</Chip>
										</div>
										<Divider orientation="vertical" />
										<div className="space-x-2">
											<span>Dodane:</span>
											<Chip color="primary">
												{format(new Date(offer.created_at), "dd/MM/yyyy")}
											</Chip>
										</div>
										<Divider orientation="vertical" />
										<div className="space-x-2">
											<span>Wygasa dnia:</span>
											<Chip color="primary">
												{offer.expired_at && format(new Date(offer.expired_at), "dd/MM/yyyy")}
											</Chip>
										</div>
										{offer.updated_at && (
											<>
												<Divider orientation="vertical" />
												<div className="">
													Aktualizowane:
													<Chip color="primary">
														{format(new Date(offer.updated_at), "dd/MM/yyyy")}
													</Chip>
												</div>
											</>
										)}
									</div>
								</CardBody>
							</Card>
							<Card>
								<CardBody>
									<div>
										{offer.contact_options && offer.author?.userInfo ? (
											<ContactAuthor
												contactOptions={offer.contact_options}
												userInfo={offer.author}
											/>
										) : (
											"Brak informacji odnośnie kontaktu"
										)}
									</div>
								</CardBody>
							</Card>
							<Card>
								<CardBody>
									<div className="space-x-2">
										{offer.price !== 0 ? `Cena: ` : ""}
										<Chip color="success">
											{offer.price !== 0 ? `${offer.price} zł` : "Za darmo"}{" "}
										</Chip>
									</div>
								</CardBody>
							</Card>
							<div className="pt-5">
								<Card>
									<CardBody>
										<p className="text-lg font-normal text-gray-500 dark:text-gray-400  lg:text-xl">
											{offer.description}
										</p>
									</CardBody>
								</Card>
							</div>
						</div>

						<div className="flex justify-center pt-10 lg:pt-0">
							{offer.image ? <DetailPageImage element={offer.image} /> : <CameraOff />}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
