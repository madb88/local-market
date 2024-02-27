type StatusCodeT = {
	[key: string]: {
		status: string;
		color: "default" | "primary" | "secondary" | "success" | "warning" | "danger" | undefined;
		label: string;
	};
};

export const statusCode: StatusCodeT = {
	accepted: { status: "accepted", color: "success", label: "Zaakceptowane" },
	pending: { status: "pending", color: "warning", label: "Oczekuje na akceptację" },
	danger: { status: "delete", color: "danger", label: "Do usunięcia" },
};
