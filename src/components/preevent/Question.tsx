import axios from "axios";
import { useEffect, useState } from "react";

export interface QuestionData {
	title: string;
	description: string;
	points: number;
}

export default function Question({ date }: { date: number }) {
	// set default value as null for production
	const [question, setQuestion] = useState<QuestionData | null>({
		title: "Reuben",
		description: "in the memory of reuben - the pig",
		points: 500,
	});

	useEffect(() => {
		axios
			.get(`/ctf/question/${date}`)
			.then((res: { data: QuestionData }) => {
				setQuestion(res.data);
			})
			.catch(() => {});
	});

	if (!question) return <>Loading...</>;

	return (
		<div className="top-0 m-2 flex h-full w-full flex-col rounded-xl border border-gray-700 bg-slate-900 shadow-sm shadow-slate-700/[.7]">
			<div className="p-4">
				<h3 className="text-lg font-bold text-white">{question.title}</h3>
				<p className="mt-2 text-gray-300">{question.description}</p>
				<p className="mt-2 text-gray-500">{question.points}</p>
			</div>
		</div>
	);
}
