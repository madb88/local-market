import { checkRole } from "@/app/utils/checkRole";
import AddNewOfferButton from "./Functions/AddNewOfferButton";

export default function OffersHeader() {
	return <div className="flex px-5 pt-2">{checkRole() ? <AddNewOfferButton /> : ""}</div>;
}
