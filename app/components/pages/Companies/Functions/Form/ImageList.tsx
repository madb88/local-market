import { Card } from "@/app/components/ui/atoms/card";
import { type UploadFileResponse } from "uploadthing/client";

type ImageListType = {
	images: UploadFileResponse<{ uploadedFile: string }>[];
};

export default function ImageList({ images }: ImageListType) {
	const title = <>{images.length ? <p>Wrzucone zdjęcie</p> : null}</>;

	return (
		<>
			<Card className="flex justify-around">
				<p>{title}</p>
				<ul>
					{images.map((image) => (
						<li key={image.key}>{image.name}</li>
					))}
				</ul>
			</Card>
		</>
	);
}
