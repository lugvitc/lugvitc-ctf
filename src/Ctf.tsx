/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import { Card, Challenge } from "./components/challenges/Card";
import axios from "axios";
interface QuestionProp {
	id: number;
	name: string;
	description: string;
	points: number;
}

export function CtfPage() {
	const [challenges, setChallenges] = useState<Challenge[]>([]);
	const [question, setQuestion] = useState<QuestionProp[]>([]);

	// seed some challenges
	if (challenges.length === 0) {
		setChallenges([
			{
				id: 1,
				title: "Challenge 1",
				description: "This is a description",
				points: 100,
			},
			{
				id: 2,
				title: "Challenge 2",
				description: "This is a description",
				points: 100,
			},
			{
				id: 3,
				title: "Challenge 3",
				description: "This is a description",
				points: 100,
			},
			{
				id: 4,
				title: "Challenge 4",
				description: "This is a description",
				points: 100,
			},
			{
				id: 5,
				title: "Challenge 5",
				description: "This is a description",
				points: 100,
			},
			{
				id: 6,
				title: "Challenge 6",
				description: "This is a description",
				points: 100,
			},
			{
				id: 7,
				title: "Challenge 7",
				description: "This is a description",
				points: 100,
			},
			{
				id: 8,
				title: "Challenge 8",
				description: "This is a description",
				points: 100,
			},
		]);
	}

	useEffect(() => {
		axios
			.get("http://localhost:5000/api/ctf/list")
			.then((res) => {
				setQuestion(res.data as QuestionProp[]);
				console.log(question);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);
	// TODO: Fetch challenges from the server

	return (
		<main className="flex min-h-screen flex-col items-center justify-center p-4 font-source-code-pro">
			<h1 className="text-4xl font-semibold">CTF</h1>
			<div className="grid w-full max-w-6xl grid-cols-2 gap-4">
				{challenges.map((challenge) => (
					<Card challenge={challenge} key={challenge.id} />
				))}
			</div>
		</main>
	);
}
