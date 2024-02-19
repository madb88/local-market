import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";
import { type Database } from "./types";

export type CompanyType = Database["public"]["Tables"]["companies"]["Row"];
export type OfferType = Database["public"]["Tables"]["offers"]["Row"];

type ServerClientType = {
	token?: string;
	shouldBeAuth?: boolean;
	serverComponent?: boolean;
};

export async function createSupabaseServerClient({
	shouldBeAuth = true,
	serverComponent = false,
	token,
}: ServerClientType) {
	return createServerClient<Database>(
		process.env.NEXT_PUBLIC_SUPABASE_URL!,
		process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
		{
			cookies: {
				get(name: string) {
					if (serverComponent) return;
					return cookies().get(name)?.value;
				},
				set(name: string, value: string, options: CookieOptions) {
					if (serverComponent) return;
					cookies().set({ name, value, ...options });
				},
				remove(name: string, options: CookieOptions) {
					if (serverComponent) return;
					cookies().set({ name, value: "", ...options });
				},
			},
			global: { headers: { Authorization: `${shouldBeAuth && `Bearer ${token}`}` } },
		},
	);
}

export function createSupabaseServerComponentClient() {
	return createSupabaseServerClient({ shouldBeAuth: false, serverComponent: true });
}
