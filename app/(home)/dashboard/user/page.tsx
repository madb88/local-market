import UserPersonalInforForm from "@/app/components/pages/Dashboard/Options/UserPersonalInfoForm";
import { currentUser } from "@clerk/nextjs";
import { Suspense } from "react";
import Loading from "./loading";

export const revalidate = 60;

export type userData = {
	role: string;
	number: string;
	messengerId: string;
	id: string;
	email: string;
	firstName: string;
	lastName: string;
};

export default async function DashboardUserInfoPage() {
	const user = await currentUser();

	const userData = {
		role: user?.publicMetadata.role as string,
		number: user?.publicMetadata.number as string,
		messengerId: user?.publicMetadata.messengerId as string,
		id: user?.id as string,
		email: user?.emailAddresses[0].emailAddress as string,
		firstName: user?.firstName as string,
		lastName: user?.lastName as string,
	};
	return (
		<Suspense fallback={<Loading />}>
			<div className="flex justify-center pt-2 md:pt-5">
				{user ? <UserPersonalInforForm user={userData} /> : "Brak danych"}
			</div>
		</Suspense>
	);
}
