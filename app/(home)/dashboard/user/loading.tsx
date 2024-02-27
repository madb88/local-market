import { Spinner } from "@nextui-org/react";

export default function Loading() {
	return (
		<div className="flex justify-center pt-5">
			<Spinner label="Ładuję dane uzytkownika" color="primary" labelColor="foreground" />
		</div>
	);
}
