import { Image } from "@nextui-org/react";
import { CameraOff } from "lucide-react";
import { useState } from "react";

const ImageWithHideOnError = (props: any) => {
	const [hideImage, setHideImage] = useState(false);

	return !hideImage ? (
		<Image
			{...props}
			onError={() => {
				setHideImage(true);
			}}
		/>
	) : (
		<CameraOff />
	);
};

export default ImageWithHideOnError;
