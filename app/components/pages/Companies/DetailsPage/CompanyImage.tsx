"use client";

import { Skeleton } from "@/app/components/ui/atoms/skeleton";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { type CompanyDetailsPageT } from "./types";

export default function CompanyImage({ company }: CompanyDetailsPageT) {
	const [reveal, setReveal] = useState(false);
	const visibility = reveal ? "visible" : "hidden";
	const loader = reveal ? "none" : "visibile";

	return (
		<>
			{company.images ? (
				<>
					<span
						style={{
							display: loader,
						}}
					>
						<Skeleton className="h-16 w-32 bg-slate-400" />
					</span>
					<Link href={company.images} target="_blank">
						<Image
							src={company.images}
							width={250}
							height={250}
							alt="Zdjecie firmy"
							style={{ visibility }}
							onLoad={() => setReveal(true)}
						/>
					</Link>
				</>
			) : (
				"Brak zdjec"
			)}
		</>
	);
}
