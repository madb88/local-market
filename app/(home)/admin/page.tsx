import { checkSpecificRole } from "@/app/utils/checkRole";

export default function DashboardAdminPage() {
	if (!checkSpecificRole("admin")) {
		return "Brak uprawnien";
	}

	return <div>Admin dashboard</div>;
}
