"use client";
import { useParams } from "next/navigation";
import CategoryContainer from "@/app/components/pages/Categories/CategoryContainer";

export default function CategoryPage() {
	const params = useParams<{ categoryName: string }>();
	return <CategoryContainer name={params.categoryName} />;
}
