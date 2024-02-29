import { type CompanyType } from "@/lib/supabase/serverAppRouter";
import { CameraOff } from "lucide-react";
import { revalidateTag } from "next/cache";
import DetailPageImage from "../../../ui/molecules/DetailPageImage";
import CompanyHeader from "./CompanyHeader";

export const revalidate = 1;
export default function Company({
	company,
	isFavorite,
}: {
	company: CompanyType;
	isFavorite: boolean;
}) {
	revalidateTag("company");
	return (
		<div className="flex flex-col gap-5">
			<div className="flex justify-end">
				<CompanyHeader
					authorId={company.user_id ? company.user_id : null}
					companyId={company.id}
					isFavorite={isFavorite}
				/>
			</div>
			<div className="lg:grid-row-2 lg:grid">
				<div>
					<h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
						{company.name}
					</h1>
				</div>
				<div className="grid-cols-2 lg:grid">
					<div>
						<p className="text-lg font-normal text-gray-500 dark:text-gray-400  lg:text-xl">
							{company.description}
						</p>
					</div>
					<div className="flex flex-col gap-2 pt-5">
						{company.images ? <DetailPageImage element={company.images} /> : <CameraOff />}
					</div>
				</div>
			</div>
		</div>
	);
}
