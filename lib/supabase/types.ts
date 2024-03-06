import { type AuthorT, type ContactOptionsT, type ImageObject } from "./additionalTypes";

export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
	public: {
		Tables: {
			companies: {
				Row: {
					created_at: string | null;
					description: string | null;
					id: number;
					image_object: ImageObject | null;
					images: string | null;
					name: string | null;
					status: string | null;
					updated_at: string | null;
					user_id: string | null;
					name_description: string | null;
				};
				Insert: {
					created_at?: string | null;
					description?: string | null;
					id?: never;
					image_object?: ImageObject | null;
					images?: string | null;
					name?: string | null;
					status?: string | null;
					updated_at?: string | null;
					user_id?: string | null;
				};
				Update: {
					created_at?: string | null;
					description?: string | null;
					id?: never;
					image_object?: ImageObject | null;
					images?: string | null;
					name?: string | null;
					status?: string | null;
					updated_at?: string | null;
					user_id?: string | null;
				};
				Relationships: [];
			};
			favorite_companies: {
				Row: {
					company_id: number | null;
					created_at: string;
					id: number;
					user_id: string | null;
				};
				Insert: {
					company_id?: number | null;
					created_at?: string;
					id?: number;
					user_id?: string | null;
				};
				Update: {
					company_id?: number | null;
					created_at?: string;
					id?: number;
					user_id?: string | null;
				};
				Relationships: [
					{
						foreignKeyName: "public_favorite_companies_company_id_fkey";
						columns: ["company_id"];
						isOneToOne: false;
						referencedRelation: "companies";
						referencedColumns: ["id"];
					},
				];
			};
			favorite_offers: {
				Row: {
					created_at: string;
					id: number;
					offer_id: number | null;
					user_id: string | null;
				};
				Insert: {
					created_at?: string;
					id?: number;
					offer_id?: number | null;
					user_id?: string | null;
				};
				Update: {
					created_at?: string;
					id?: number;
					offer_id?: number | null;
					user_id?: string | null;
				};
				Relationships: [
					{
						foreignKeyName: "public_favorite_offers_offer_id_fkey";
						columns: ["offer_id"];
						isOneToOne: false;
						referencedRelation: "offers";
						referencedColumns: ["id"];
					},
				];
			};
			offers: {
				Row: {
					author: AuthorT | null;
					category_name: string | null;
					contact_options: ContactOptionsT | null;
					created_at: string;
					description: string | null;
					expired_at: string | null;
					id: number;
					image: string | null;
					image_object: ImageObject | null;
					name: string | null;
					price: number | null;
					status: string | null;
					updated_at: string | null;
					user_id: string | null;
					name_description: string | null;
				};
				Insert: {
					author?: AuthorT | null;
					category_name?: string | null;
					contact_options?: ContactOptionsT | null;
					created_at?: string;
					description?: string | null;
					expired_at?: string | null;
					id?: number;
					image?: string | null;
					image_object?: ImageObject | null;
					name?: string | null;
					price?: number | null;
					status?: string | null;
					updated_at?: string | null;
					user_id?: string | null;
				};
				Update: {
					author?: AuthorT | null;
					category_name?: string | null;
					contact_options?: ContactOptionsT | null;
					created_at?: string;
					description?: string | null;
					expired_at?: string | null;
					id?: number;
					image?: string | null;
					image_object?: ImageObject | null;
					name?: string | null;
					price?: number | null;
					status?: string | null;
					updated_at?: string | null;
					user_id?: string | null;
				};
				Relationships: [];
			};
		};
		Views: {
			[_ in never]: never;
		};
		Functions: {
			name_description:
				| {
						Args: {
							"": unknown;
						};
						Returns: string;
				  }
				| {
						Args: {
							"": unknown;
						};
						Returns: string;
				  };
			requesting_user_id: {
				Args: Record<PropertyKey, never>;
				Returns: string;
			};
		};
		Enums: {
			[_ in never]: never;
		};
		CompositeTypes: {
			[_ in never]: never;
		};
	};
};

export type Tables<
	PublicTableNameOrOptions extends
		| keyof (Database["public"]["Tables"] & Database["public"]["Views"])
		| { schema: keyof Database },
	TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
		? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
				Database[PublicTableNameOrOptions["schema"]]["Views"])
		: never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
	? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
			Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
			Row: infer R;
		}
		? R
		: never
	: PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
				Database["public"]["Views"])
		? (Database["public"]["Tables"] &
				Database["public"]["Views"])[PublicTableNameOrOptions] extends {
				Row: infer R;
			}
			? R
			: never
		: never;

export type TablesInsert<
	PublicTableNameOrOptions extends keyof Database["public"]["Tables"] | { schema: keyof Database },
	TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
		? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
		: never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
	? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
			Insert: infer I;
		}
		? I
		: never
	: PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
		? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
				Insert: infer I;
			}
			? I
			: never
		: never;

export type TablesUpdate<
	PublicTableNameOrOptions extends keyof Database["public"]["Tables"] | { schema: keyof Database },
	TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
		? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
		: never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
	? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
			Update: infer U;
		}
		? U
		: never
	: PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
		? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
				Update: infer U;
			}
			? U
			: never
		: never;

export type Enums<
	PublicEnumNameOrOptions extends keyof Database["public"]["Enums"] | { schema: keyof Database },
	EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
		? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
		: never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
	? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
	: PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
		? Database["public"]["Enums"][PublicEnumNameOrOptions]
		: never;
