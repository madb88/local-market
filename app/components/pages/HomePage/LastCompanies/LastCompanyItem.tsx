import { type CompanyType } from "@/lib/supabase/serverAppRouter";
import { Card, CardBody, CardHeader, Image } from "@nextui-org/react";
import { format } from "date-fns";
import NextImage from "next/image";
import Link from "next/link";

export default function LastCompanyItem({ company }: { company: CompanyType }) {
	return (
		<Link href={`/companies/${company.id}`}>
			<Card className="h-full cursor-pointer bg-slate-100 py-4  shadow-md dark:bg-slate-500">
				<CardHeader className="flex-col items-start px-4 pb-0 pt-2">
					<div className="flex w-full  justify-between">
						<p className="text-tiny font-bold uppercase">
							{company.created_at ? format(new Date(company.created_at), "dd/MM/yyyy") : ""}
						</p>
					</div>
					<h4 className="text-large font-bold">{company.name}</h4>
				</CardHeader>
				<CardBody className="flex justify-center overflow-visible">
					<div className="flex justify-center">
						{company.images ? (
							<Image
								as={NextImage}
								alt="Card background"
								className="rounded-xl object-cover"
								src={company.images}
								width={150}
								height={150}
								sizes="(min-width: 2880px) 400px, (min-width: 780px) calc(16.06vw - 59px), calc(33.7vw - 30px)"
							/>
						) : (
							<Image src="/noPhoto.png" height={250} width={250} alt={"Brak zdjecia"} />
						)}
					</div>
				</CardBody>
			</Card>
		</Link>
	);
}
