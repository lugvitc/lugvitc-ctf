interface Props {
	title: string;
	description: string;
	points: number;
}

export function Card(props: Props) {
	return (
		<div className="m-2 flex w-full flex-col justify-between rounded-xl border border-gray-600 bg-black p-6 shadow-md">
			<div>
				<h3 className="text-center text-3xl font-extrabold text-sky-blue">
					{props.title}
				</h3>
				<h3 className="mt-4 text-lg font-semibold text-gray-300">
					Description
				</h3>
				<p className="mt-1 text-gray-300">{props.description}</p>
				<p className="mt-2 text-gray-400">Points: {props.points}</p>
			</div>
			<div className="flex w-full flex-col gap-1">
				<label className="text-gray-400">Flag</label>
				<input
					type="text"
					placeholder="flag{}"
					className="block w-full rounded-lg border border-gray-600 bg-dark-grayish-blue p-2.5 text-sm text-white placeholder-gray-500"
				/>
			</div>
			<button className="mt-4 h-12 w-full rounded-xl bg-midnight-blue text-lg font-bold text-white hover:bg-gray-600">
				Submit
			</button>
		</div>
	);
}
