import { categories } from "@/app/utils/categoriesData";
import { Card, CardBody } from "@nextui-org/react";
import Link from "next/link";

export default async function CategoryPage() {
	return (
		<div className="flex  p-5">
			<ul className="space-y-5">
				{categories.map((category) => {
					return (
						<li key={category.key}>
							<Card>
								<CardBody>
									<Link href={`offers/${category.value}`}>{category.label}</Link>
								</CardBody>
							</Card>
						</li>
					);
				})}
			</ul>
		</div>
	);
}
