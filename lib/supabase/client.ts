import { createBrowserClient } from "@supabase/ssr";

export function createSupabaseFrontendClient(token: string) {
	return createBrowserClient(
		process.env.NEXT_PUBLIC_SUPABASE_URL!,
		process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
		{
			cookies: {},
			global: { headers: { Authorization: `Bearer ${token}` } },
		},
	);
}
