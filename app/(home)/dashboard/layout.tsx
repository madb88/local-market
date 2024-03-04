import DashboardTabs from "@/app/components/pages/Dashboard/DashboardTabs";
import { currentUser } from "@clerk/nextjs";
import { Card, CardBody } from "@nextui-org/react";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
	const user = await currentUser();

	return (
		<div className="bg-slate-100 pb-20 dark:bg-slate-600">
			<div className="px-2 pt-2 md:px-5">
				<Card>
					<CardBody>
						<div className="flex space-x-2">
							<p>Panel Użytkownika</p>
							<p className="inline-block bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-400 bg-clip-text text-transparent">
								{user?.firstName} {user?.lastName}
							</p>
						</div>
					</CardBody>
				</Card>
				<div className="w-full pt-2">{<DashboardTabs />}</div>
				<div className="px-2 pt-2 md:px-5">{children}</div>
			</div>
		</div>
	);
}
