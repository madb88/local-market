import { Card } from "@/app/components/ui/atoms/card";
import { Image } from "@nextui-org/react";
import { Suspense } from "react";
import { type UploadFileResponse } from "uploadthing/client";
import DeleteImage from "./DeleteImage";

type ImageListType = {
	images: UploadFileResponse<{ uploadedFile: string }>[];
	removeImage: (image: string) => void;
};

export default function ImageList({ images, removeImage }: ImageListType) {
	return (
		<Suspense>
			<Card className="flex justify-around pb-10 pt-10">
				<ul>
					{images.map((image) => (
						<li key={image.key}>
							<div className="flex gap-2">
								<Image src={image.url} alt="Wrzucone zdjecie" width={250} height={250} />
								<div className="">
									<DeleteImage imageKey={image.key} removeImage={removeImage} />
								</div>
							</div>
						</li>
					))}
				</ul>
			</Card>
		</Suspense>
	);
}
