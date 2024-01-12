import { HintModal } from "./Hint";

export interface Challenge {
	id: number;
	title: string;
	description: string;
	points: number;
	hints: string[];
}

interface CardProps {
	challenge: Challenge;
}

export function Card({ challenge }: CardProps) {
	return (
		<div className="m-2 flex w-full flex-col justify-between rounded-xl border border-gray-600 bg-black p-6 shadow-md">
			<div>
				<h3 className="text-center text-3xl font-extrabold text-sky-blue">
					{challenge.title}
				</h3>

				<div className="flex items-start justify-between">
					<div>
						<h3 className="text-xl font-bold text-gray-300">Description</h3>
						<p className="mt-2 text-gray-300">{challenge.description}</p>
						<p className="mt-4 text-gray-400">Points: {challenge.points}</p>
					</div>

					<div className="flex space-x-2">
						{challenge.hints.map((hint, index) => (
							<HintModal key={index} hintNumber={index + 1} hint={hint} />
						))}
					</div>
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
		</div>
	);
}
