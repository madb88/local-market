import { type OfferType } from "@/lib/supabase/serverAppRouter";
import { NextResponse, type NextRequest } from "next/server";
import { getAllOffersWithFilters } from "..";

export const dynamic = "force-dynamic"; // static by default, unless reading the request

export type AllOffersT = {
	offers: OfferType[];
	count: number;
};

export async function GET(request: NextRequest): Promise<NextResponse<AllOffersT>> {
	const page = request.nextUrl.searchParams.get("page") ?? "1";
	const per_page = request.nextUrl.searchParams.get("per_page") ?? "4";
	const start = (Number(page) - 1) * Number(per_page);
	const end = start + Number(per_page);

	const categoryName = request.nextUrl.searchParams.get("categoryName") ?? "";
	const status = request.nextUrl.searchParams.get("status") ?? "";

	const { offers, count } = await getAllOffersWithFilters(start, end, categoryName, status);

	if (offers && count) {
		return NextResponse.json({ offers: offers, count: count });
	} else {
		return NextResponse.json({ offers: [], count: 0 });
	}
}
