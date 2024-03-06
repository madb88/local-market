import { revalidatePath, revalidateTag } from "next/cache";
import { deleteExpiredOffer } from "../../offers";

export const dynamic = "force-dynamic"; // static by default, unless reading the request

export async function GET() {
	const { message, status } = await deleteExpiredOffer(
		`${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!}`,
	);
	revalidateTag("userOffers");
	revalidatePath("dashboard/offers");
	return new Response(`${message} ${status}`);
}
