import { getOffer } from "@/app/api/offers";
import OfferForm from "@/app/components/pages/Offers/Functions/Form/OfferForm";
import BackButton from "@/app/components/ui/atoms/BackButton";
import { checkRole } from "@/app/utils/checkRole";
import { currentUser } from "@clerk/nextjs";

export default async function EditOfferPage({ params }: { params: { id: number } }) {
	const offer = await getOffer(params.id);

	const user = await currentUser();

	if (!user || !checkRole()) {
		return <p>Brak uprawnień</p>;
	}

	const userContactInfo = {
		messengerId: user.publicMetadata.messengerId ? user.publicMetadata.messengerId : "",
		number: user.publicMetadata.number ? user.publicMetadata.number : "",
		email: user.publicMetadata.email ? user.publicMetadata.email : "",
	};
	return (
		<div className="flex flex-col gap-5 px-5 pt-2">
			<div className="flex justify-end pt-2">
				<BackButton />
			</div>
			{offer ? (
				<div className="xl:w-6/6">
					<h2 className="text-4xl font-extrabold dark:text-white">Edytuj firmę {offer.name}</h2>
					{offer.category_name ? (
						<OfferForm
							categoryName={offer.category_name}
							userContactInfo={userContactInfo}
							data={offer}
						/>
					) : null}
				</div>
			) : null}
		</div>
	);
}
