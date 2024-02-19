"use client";
import { ImageWithHideOnError } from "@/lib/helpers/ImageWithHideOnError";
import { CameraOff } from "lucide-react";

export default function DetailPageImage({ element }: { element: string }) {
	const timeStamp = new Date().getTime();

	return (
		<>
			{element ? (
				<>
					<ImageWithHideOnError
						src={`${element}?${timeStamp}`}
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
