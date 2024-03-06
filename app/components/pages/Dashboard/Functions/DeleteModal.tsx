import { type CompanyType, type OfferType } from "@/lib/supabase/serverAppRouter";
import {
	Button,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
	Tooltip,
	useDisclosure,
} from "@nextui-org/react";
import { type PostgrestError } from "@supabase/supabase-js";
import { Trash } from "lucide-react";
import { toast } from "sonner";
import DeleteButton from "./DeleteButton";

type DeleteModalT = {
	element: OfferType | CompanyType;
	title: string;
	actionFunction: (
		id: number,
		values: { status: string; image: string },
	) => Promise<{ message: string; error: PostgrestError | null }>;
	tooltipText: string;
	toastMessage: string;
};

export default function DeleteModal({
	element,
	title,
	actionFunction,
	tooltipText,
	toastMessage,
}: DeleteModalT) {
	const { isOpen, onOpen, onOpenChange } = useDisclosure();

	return (
		<>
			<Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
				<ModalContent>
					{(onClose) => (
						<>
							<ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
							<ModalBody>
								<form
									action={async () => {
										const { error } = await actionFunction(element.id, {
											status: "delete",
											image:
												element.image_object && element.image_object[0]
													? element.image_object[0].key
													: "",
										});
										if (!error) {
											onClose();
											return toast.success(toastMessage, {
												closeButton: true,
												duration: 3000,
											});
										}
										onClose();
										return toast.error(error?.message, {
											closeButton: true,
											duration: 3000,
										});
									}}
								>
									<ModalFooter>
										<Button color="danger" variant="light" onPress={onClose}>
											Zamknij
										</Button>
										<DeleteButton />
									</ModalFooter>
								</form>
							</ModalBody>
						</>
					)}
				</ModalContent>
			</Modal>
			<Tooltip color="danger" content={tooltipText}>
				<Button color="danger" aria-label={tooltipText} isIconOnly onClick={onOpen}>
					<Trash />
				</Button>
			</Tooltip>
		</>
	);
}
