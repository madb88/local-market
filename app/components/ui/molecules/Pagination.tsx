"use client";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

type PaginationProps = {
	hasNextPage: boolean;
	hasPrevPage: boolean;
	currentPage: string;
	perPage: string;
	count: number;
	url: string;
};

export const Pagination = ({
	hasNextPage,
	hasPrevPage,
	currentPage,
	perPage,
	count,
	url,
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
					router.push(`/${url}page=${Number(page) - 1}&per_page=${per_page}`);
				}}
				aria-label="Strona poprzednia"
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
					router.push(`/${url}page=${Number(page) + 1}&per_page=${per_page}`);
				}}
				aria-label="Strona nastepna"
			>
				<ArrowRight />
			</button>
		</div>
	);
};
