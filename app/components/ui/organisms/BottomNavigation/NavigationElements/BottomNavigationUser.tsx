"use client";

import { ModeToggle } from "@/app/components/toggle-mode";
import { User } from "lucide-react";
import ButtonLink from "../../../atoms/ButtonLink";
import LoginButton from "../../../atoms/LoginButton";
import { Sheet, SheetContent, SheetTrigger } from "../../../atoms/sheet";

export default function BottomNavigationUser() {
	return (
		<Sheet key={"bottom"}>
			<SheetTrigger asChild className="w-full">
				<User />
			</SheetTrigger>
			<SheetContent side={"bottom"} className="flex  w-screen justify-center dark:bg-slate-600">
				<div className="grid space-y-2">
					<ButtonLink
						link="/dashboard/user"
						label="Profil"
						style="bg-gradient-to-tr from-orange-700 to-yellow-500 text-white shadow-lg"
						startContent={<User />}
						isSheet={true}
					>
						Panel użytkownika
					</ButtonLink>
					<div className="flex justify-between gap-2 align-middle">
						<LoginButton />
						<ModeToggle />
					</div>
				</div>
			</SheetContent>
		</Sheet>
	);
}
