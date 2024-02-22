import { type OfferType } from "@/lib/supabase/serverAppRouter";
import { Folder } from "lucide-react";
import { isEmpty } from "ramda";
import { type FC } from "react";
import CategoryListElement from "./OfferListElement";
import { type OfferListT } from "./type";

const OfferList: FC<OfferListT> = ({ offers, name }) => {
	return (
		<div className="h-fit">
			{!isEmpty(offers) ? (
				<ul className="grid gap-2 pt-2 md:grid-cols-2 md:px-5">
					{offers.map((offer: OfferType, index) => (
						<li key={index}>
							<CategoryListElement offer={offer} />
						</li>
					))}
				</ul>
			) : (
				<div className="flex flex-col justify-center gap-5 pt-16">
					<span className="flex justify-center">
						<Folder />
					</span>
					<h3 className="flex justify-center">Brak ofert dla {name}</h3>
				</div>
			)}
		</div>
	);
};

export default OfferList;
