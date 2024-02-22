import { Skeleton } from "@/app/components/ui/atoms/skeleton";

export default function Loading() {
	return (
		<div>
			<ul className="grid gap-5 px-5 pt-2 dark:bg-slate-600 md:grid-cols-2">
				{[...Array(8).keys()].map((i) => (
					<li key={i}>
						<div className="flex items-center space-x-4">
							{/* <Skeleton className="h-12 w-12 rounded-full bg-slate-400" /> */}
							<div className="flex w-full flex-col space-y-2">
								<Skeleton className="h-4 w-2/6 bg-slate-400" />
								<Skeleton className="w-6/6 h-4 bg-slate-400" />
							</div>
						</div>
					</li>
				))}
			</ul>
		</div>
	);
}
