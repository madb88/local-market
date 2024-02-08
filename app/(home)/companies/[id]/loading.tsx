import { Skeleton } from "@/app/components/ui/atoms/skeleton";

export default function Loading() {
	return (
		<>
			<div className="items-center space-x-4 p-10">
				<div className="flex w-full flex-col space-y-2">
					<Skeleton className="h-20 w-2/6 bg-slate-400" />
					<Skeleton className="w-6/6 h-32 bg-slate-400" />
				</div>
			</div>
		</>
	);
}
