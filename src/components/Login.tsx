export default function Login() {
	return (
		<main className="flex h-screen flex-col items-center justify-center">
			<div className="w-96 rounded bg-white p-8 shadow-md">
				<h1 className="mb-6 text-2xl font-semibold text-black">
					Password Team Login
				</h1>

				<form action="#" method="POST">
					<div className="mb-4">
						<label htmlFor="username"className="mb-2 block text-sm font-medium text-black">
							Team Name
						</label>
						<input
							type="text"
							id="username"
							name="username"
							className="w-full rounded border px-3 py-2 text-black focus:border-blue-500 focus:outline-none"
							required
						/>
					</div>

					<div className="mb-4">
						<label
							htmlFor="password"
							className="mb-2 block text-sm font-medium text-black"
						>
							Password
						</label>
						<input
							type="password"
							id="password"
							name="password"
							className="w-full rounded border px-3 py-2 text-black focus:border-blue-500 focus:outline-none"
							required
						/>
					</div>

					<button
						type="submit"
						className="w-full rounded bg-blue-500 p-2 text-white hover:bg-blue-600 focus:bg-blue-600 focus:outline-none"
					>
						Login
					</button>
				</form>

				<p className="mt-4 text-sm text-gray-600">
					Don't have an account?{" "}
					<a href="#" className="text-blue-500 hover:underline">
						Sign up
					</a>
				</p>
			</div>
		</main>
	);
}
