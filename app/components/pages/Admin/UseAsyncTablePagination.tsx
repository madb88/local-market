"use client";

import { type AllOffersT } from "@/app/api/offers/all/route";
import { Pagination } from "@nextui-org/react";
import { useMemo, useState } from "react";
import useSWR from "swr";

const fetcher = (...args: [string, RequestInit]) => fetch(...args).then((res) => res.json());

export default function UseAsyncTablePagination() {
	const [page, setPage] = useState(1);

	const { data, isLoading } = useSWR<AllOffersT>(`/api/offers/all?page=${page}`, fetcher, {
		keepPreviousData: true,
	});

	const rowsPerPage = 4;

	const pages = useMemo(() => {
		return data?.count ? Math.ceil(data.count / rowsPerPage) : 0;
	}, [data?.count, rowsPerPage]);

	const loadingState = isLoading || data?.offers.length === 0 ? "loading" : "idle";

	return {
		items: data?.offers ?? [],
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
		loadingState: loadingState as "loading" | "idle",
	};
}
