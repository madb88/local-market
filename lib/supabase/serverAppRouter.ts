import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";
import { auth } from "@clerk/nextjs";
import { type Database } from "./types";

export type CompanyType = Database["public"]["Tables"]["companies"]["Row"];

export async function createSupabaseServerClient(shouldBeAuth = true, serverComponent = false) {
	const { getToken } = auth();
	const token = await getToken({ template: "supabase" });

	const cookieStore = cookies();

	return createServerClient<Database>(
		process.env.NEXT_PUBLIC_SUPABASE_URL!,
		process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
		{
			cookies: {
				get(name: string) {
					return cookieStore.get(name)?.value;
				},
				set(name: string, value: string, options: CookieOptions) {
					if (serverComponent) return;
					cookieStore.set({ name, value, ...options });
				},
				remove(name: string, options: CookieOptions) {
					if (serverComponent) return;
					cookieStore.set({ name, value: "", ...options });
				},
			},
			global: { headers: { Authorization: `${shouldBeAuth && `Bearer ${token}`}` } },
		},
	);
}
