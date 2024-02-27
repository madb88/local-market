"use client";

import { type OfferType } from "@/lib/supabase/serverAppRouter";
import { Pagination } from "@nextui-org/react";
import { useMemo, useState } from "react";

export type TablePaginationT = {
	data: [] | null | OfferType[];
};

export default function UseTablePagination({ data }: TablePaginationT) {
	const [page, setPage] = useState(1);
	const rowsPerPage = 5;
	const pages = data ? Math.ceil(data?.length / rowsPerPage) : 1;

	const items = useMemo(() => {
		const start = (page - 1) * rowsPerPage;
		const end = start + rowsPerPage;

		return data ? data.slice(start, end) : [];
	}, [page, data]);

	return {
		items: items,
		pagination: (
			<Pagination
				isCompact
				showControls
				showShadow
				color="primary"
				page={page}
				total={pages}
				onChange={(page) => setPage(page)}
			/>
		),
	};
}
