import { Image } from "@nextui-org/react";
import { CameraOff } from "lucide-react";
import { useState } from "react";

type ImageWithHideOnErrorT = { src: string; width: number; height: number; alt: string };

export const ImageWithHideOnError = (props: ImageWithHideOnErrorT) => {
	const [hideImage, setHideImage] = useState(false);

	return !hideImage ? (
		<Image
			src={props.src}
			width={props.width}
			height={props.height}
			alt={props.alt}
			onError={() => {
				setHideImage(true);
			}}
		/>
	) : (
		<CameraOff />
	);
};
