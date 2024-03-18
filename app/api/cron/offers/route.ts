import { revalidatePath, revalidateTag } from "next/cache";
import { type NextRequest } from "next/server";
import { deleteOffer } from "../../offers";

export const dynamic = "force-dynamic"; // static by default, unless reading the request

export async function GET(request: NextRequest) {
	const token = request.nextUrl.searchParams.get("token");

	if (token === String(process.env.CRON_TOKEN)) {
		const { message, status } = await deleteOffer(`${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!}`);
		revalidateTag("userOffers");
		revalidatePath("dashboard/offers");
		return new Response(`${message} ${status}`);
	}

	return new Response(`Not authorized`);
}
