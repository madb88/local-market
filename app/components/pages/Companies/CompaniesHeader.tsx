import { checkRole } from "@/app/utils/checkRole";
import AddNewCompanyButton from "./Functions/AddNewCompanyButton";

export default function CompaniesHeader() {
	return <div className="flex px-5 pt-2">{checkRole() ? <AddNewCompanyButton /> : ""}</div>;
}
