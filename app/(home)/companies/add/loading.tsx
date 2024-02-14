import { Skeleton } from "@/app/components/ui/atoms/skeleton";

export default function Loading() {
	return (
		<div>
			<div className="flex items-center space-x-4">
				{/* <Skeleton className="h-12 w-12 rounded-full bg-slate-400" /> */}
				<div className="flex w-full flex-col space-y-2 px-10 pt-10">
					<Skeleton className="h-8 w-2/6 bg-slate-400" />
					<Skeleton className="w-6/6 h-36 bg-slate-400" />
				</div>
			</div>
		</div>
	);
}
