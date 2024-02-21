import DetailPageImage from "@/app/components/ui/molecules/DetailPageImage";
import { type OfferType } from "@/lib/supabase/serverAppRouter";
import { CameraOff } from "lucide-react";
import { revalidateTag } from "next/cache";
import ContactAuthor from "./ContactAuthor";
import OfferHeader from "./OfferHeader";

export default function Offer({ offer }: { offer: OfferType }) {
	revalidateTag("offer");
	return (
		<div className="flex flex-col gap-5">
			{offer ? (
				<OfferHeader
					categoryName={offer.category_name}
					name={offer.name}
					authorId={offer.user_id ? offer.user_id : null}
				/>
			) : null}

			<div className="lg:grid-row-2 lg:grid">
				<div>
					<h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
						{offer.name}
					</h1>
				</div>
				<div className="flex flex-col gap-2">
					<p>
						Dodał: {offer.author?.userInfo?.firstName} {offer.author?.userInfo?.lastName}
					</p>
					{offer.contact_options && offer.author?.userInfo ? (
						<ContactAuthor contactOptions={offer.contact_options} userInfo={offer.author} />
					) : (
						"Brak informacji odnośnie kontaktu"
					)}
				</div>

				<div className="pt-5">
					<p className="text-lg font-normal text-gray-500 dark:text-gray-400  lg:text-xl">
						{offer.description}
					</p>
				</div>
			</div>
			{offer.image ? <DetailPageImage element={offer.image} /> : <CameraOff />}
		</div>
	);
}
