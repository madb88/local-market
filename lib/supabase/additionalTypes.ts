export type ContactOptionsT = {
	messanger: boolean;
	whatsapp: boolean;
	email: boolean;
};

export type AuthorT = {
	userInfo: {
		firstName?: string;
		lastName?: string;
		role?: string;
		messengerId?: string;
		email?: string;
		number?: string;
	};
};
