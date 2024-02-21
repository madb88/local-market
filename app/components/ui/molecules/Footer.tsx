export default function Footer() {
	return (
		<>
			<footer className="fixed bottom-14 z-50 w-full shadow dark:bg-gray-800 md:bottom-0">
				<div className="mx-auto w-full max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
					<span className="text-sm text-gray-500 dark:text-gray-400 sm:text-center">
						© 2024 Jakub Kamiński
					</span>
					<ul className="mt-3 flex flex-wrap items-center text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
						<li>
							<a href="#" className="me-4 hover:underline md:me-6">
								O stronie
							</a>
						</li>
						<li>
							<a href="#" className="me-4 hover:underline md:me-6">
								Regulamin
							</a>
						</li>

						<li>
							<a href="#" className="hover:underline">
								Kontakt
							</a>
						</li>
					</ul>
				</div>
			</footer>
		</>
	);
}
