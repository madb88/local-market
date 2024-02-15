"use client";
import ImageWithHideOnError from "@/lib/helpers/ImageWithHideOnError";
import { CameraOff } from "lucide-react";
import Image from "next/image";
import { type CompanyDetailsPageT } from "./types";

export default async function CompanyImage({ company }: CompanyDetailsPageT) {
	const timeStamp = new Date().getTime();

	return (
		<>
			{company.images ? (
				<>
					<ImageWithHideOnError
						as={Image}
						src={`${company.images}?${timeStamp}`}
						width={500}
						height={500}
						alt="Zdjecie firmy"
					/>
				</>
			) : (
				<CameraOff />
			)}
		</>
	);
}
