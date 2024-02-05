"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";

type PaginationProps = {
	hasNextPage: boolean;
	hasPrevPage: boolean;
	currentPage: string;
	perPage: string;
	count: number;
};

export const Pagination = ({
	hasNextPage,
	hasPrevPage,
	currentPage,
	perPage,
	count,
}: PaginationProps) => {
	const router = useRouter();
	const searchParams = useSearchParams();

	const page = searchParams.get("page") ?? currentPage;
	const per_page = searchParams.get("per_page") ?? perPage;

	return (
		<div className="flex gap-2">
			<button
				className="bg-blue-500 p-1 text-white"
				disabled={!hasPrevPage}
				onClick={() => {
					router.push(`/companies?page=${Number(page) - 1}&per_page=${per_page}`);
				}}
			>
				<ArrowLeft />
			</button>

			<div>
				{page} / {Math.ceil(count / Number(per_page))}
			</div>

			<button
				className="bg-blue-500 p-1 text-white"
				disabled={!hasNextPage}
				onClick={() => {
					router.push(`/companies?page=${Number(page) + 1}&per_page=${per_page}`);
				}}
			>
				<ArrowRight />
			</button>
		</div>
	);
};
