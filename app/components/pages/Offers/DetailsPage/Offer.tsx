import DetailPageImage from "@/app/components/ui/molecules/DetailPageImage";
import { OfferType } from "@/lib/supabase/serverAppRouter";
import { CameraOff } from "lucide-react";
import { revalidateTag } from "next/cache";
import OfferHeader from "./OfferHeader";

export const revalidate = 1;
export default function Offer({ offer }: { offer: OfferType }) {
	revalidateTag("offer");
	return (
		<div className="flex flex-col gap-5">
			{offer ? <OfferHeader categoryName={offer.category_name} name={offer.name} /> : null}

			<div className="lg:grid-row-2 lg:grid">
				<div>
					<h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
						{offer.name}
					</h1>
				</div>
				<div className=""></div>
				<div className="">
					<p className="text-lg font-normal text-gray-500 dark:text-gray-400  lg:text-xl">
						{offer.description}
					</p>
				</div>
			</div>
			{offer.image ? <DetailPageImage element={offer.image} /> : <CameraOff />}
		</div>
	);
}
