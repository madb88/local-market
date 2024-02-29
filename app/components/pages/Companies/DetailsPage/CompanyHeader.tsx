"use client";
import BackButton from "@/app/components/ui/atoms/BackButton";
import { useUser } from "@clerk/nextjs";
import { Button } from "@nextui-org/react";
import { Edit } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import AddCompanyToFavorite from "../Functions/AddCompanyToFavorite";

type CompanyHeaderT = {
	authorId: string | null;
	companyId: number;
	isFavorite: boolean;
};

export default function CompanyHeader({ authorId, companyId, isFavorite }: CompanyHeaderT) {
	const pathname = usePathname();

	const { user, isSignedIn } = useUser();

	return (
		<div className="flex gap-5">
			{isSignedIn && <AddCompanyToFavorite companyId={companyId} isFavorite={isFavorite} />}
			{user && user.id === authorId ? (
				<Button
					aria-label="Edytuj firme"
					className="shadow-lg"
					variant="ghost"
					color="primary"
					endContent={<Edit />}
				>
					<Link href={`${pathname}/edit`}>
						<p className="text-base">Edytuj</p>
					</Link>
				</Button>
			) : null}
			<BackButton />
		</div>
	);
}
