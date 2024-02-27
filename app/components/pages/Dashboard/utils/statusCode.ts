type StatusCodeT = {
	[key: string]: {
		status: string;
		color: "default" | "primary" | "secondary" | "success" | "warning" | "danger" | undefined;
	};
};

export const statusCode: StatusCodeT = {
	accepted: { status: "accepted", color: "success" },
	pending: { status: "pending", color: "warning" },
	danger: { status: "delete", color: "danger" },
};
