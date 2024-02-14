"use client";
import ImageWithHideOnError from "@/lib/helpers/ImageWithHideOnError";
import { CameraOff } from "lucide-react";
import { type CompanyDetailsPageT } from "./types";

export default async function CompanyImage({ company }: CompanyDetailsPageT) {
	const timeStamp = new Date().getTime();

	return (
		<>
			{company.images ? (
				<>
					<ImageWithHideOnError
						src={`${company.images}?${timeStamp}`}
						width={250}
						height={250}
						alt="Zdjecie firmy"
					/>
				</>
			) : (
				<CameraOff />
			)}
		</>
	);
}
