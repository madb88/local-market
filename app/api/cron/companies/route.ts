import { deleteCompany } from "../../companies";

export const dynamic = "force-dynamic"; // static by default, unless reading the request

export async function GET() {
	const { message, status } = await deleteCompany(`${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!}`);
	return new Response(`${message} ${status}`);
}
