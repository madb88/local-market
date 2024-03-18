import { type NextRequest } from "next/server";
import { deleteCompany } from "../../companies";

export const dynamic = "force-dynamic"; // static by default, unless reading the request

export async function GET(request: NextRequest) {
	const token = request.nextUrl.searchParams.get("token");

	if (token === String(process.env.CRON_TOKEN)) {
		const { message, status } = await deleteCompany(
			`${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!}`,
		);

		return new Response(`${message} ${status}`);
	}

	return new Response(`Not authorized`);
}
