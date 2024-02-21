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
}
