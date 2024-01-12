import { useState } from "react";
import { Card } from "./components/challenges/Card";

export function CtfPage() {
	const [challenges, setChallenges] = useState<
		{
			id: number;
			title: string;
			description: string;
			points: number;
		}[]
	>();

	// seed some challenges
	if (!challenges) {
		setChallenges([
			{
				id: 1,
				title: "Challenge 1",
				description: "This is the first challenge",
				points: 100,
			},
			{
				id: 2,
				title: "Challenge 2",
				description: "This is the second challenge",
				points: 200,
			},
			{
				id: 3,
				title: "Challenge 3",
				description: "This is the third challenge",
				points: 300,
			},

			{
				id: 4,
				title: "Challenge 4",
				description: "This is the fourth challenge",
				points: 400,
			},

			{
				id: 5,
				title: "Challenge 5",
				description: "This is the fifth challenge",
				points: 500,
			},
		]);
	}

	// TODO: Fetch challenges from the server

	// return (
	// 	<main className="flex h-screen flex-col items-center justify-center">
	// 		<h1 className="text-4xl font-semibold">CTF</h1>
	// 		<div className="flex flex-row gap-4">
	// 			{challenges?.map((challenge) => (
	// 				<Card
	// 					key={challenge.id}
	// 					title={challenge.title}
	// 					description={challenge.description}
	// 					points={challenge.points}
	// 				/>
	// 			))}
	// 		</div>
	// 	</main>
	// );

	// display the ctfs in a grid with 2 columns
	return (
		<main className="flex h-screen flex-col items-center justify-center overflow-auto p-4">
			<h1 className="text-4xl font-semibold">CTF</h1>
			<div className="grid w-full max-w-6xl grid-cols-2 gap-4">
				{challenges?.map((challenge) => (
					<Card
						key={challenge.id}
						title={challenge.title}
						description={challenge.description}
						points={challenge.points}
					/>
				))}
			</div>
		</main>
	);
}
