export {};

export type Roles = "admin" | "moderator";

declare global {
	interface CustomJwtSessionClaims {
		metadata: {
			role?: Roles;
			messengerId?: string;
			number?: string;
		};
		firstName: string;
		lastName: string;
		email: string;
	}
	interface UserPublicMetadata {
		role?: string;
		messengerId?: string;
		number?: string;
		email?: string;
	}
}
