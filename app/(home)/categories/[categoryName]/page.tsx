"use client";

import CategoryContainer from "@/app/components/ui/organisms/Categories/CategoryContainer";
import { useParams } from "next/navigation";

export default function CategoryPage() {
	const params = useParams<{ categoryName: string }>();
	return <CategoryContainer name={params.categoryName} />;
}
