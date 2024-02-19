export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
	public: {
		Tables: {
			companies: {
				Row: {
					created_at: string | null;
					description: string | null;
					id: number;
					image_object: Json | null;
					images: string | null;
					name: string | null;
					status: string | null;
					updated_at: string | null;
					user_id: string | null;
				};
				Insert: {
					created_at?: string | null;
					description?: string | null;
					id?: never;
					image_object?: Json | null;
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
					image_object?: Json | null;
					images?: string | null;
					name?: string | null;
					status?: string | null;
					updated_at?: string | null;
					user_id?: string | null;
				};
				Relationships: [];
			};
			offers: {
				Row: {
					author: {
						firstName?: string;
						lastName?: string;
						phone?: string;
						address?: string;
						social: {};
					} | null;
					category_name: string | null;
					created_at: string;
					description: string | null;
					id: number;
					image: string | null;
					image_object: Json | null;
					name: string | null;
					status: string | null;
					updated_at: string | null;
					user_id: string | null;
				};
				Insert: {
					author?: Json | null;
					category_name?: string | null;
					created_at?: string;
					description?: string | null;
					id?: number;
					image?: string | null;
					image_object?: Json | null;
					name?: string | null;
					status?: string | null;
					updated_at?: string | null;
					user_id?: string | null;
				};
				Update: {
					author?: Json | null;
					category_name?: string | null;
					created_at?: string;
					description?: string | null;
					id?: number;
					image?: string | null;
					image_object?: Json | null;
					name?: string | null;
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
