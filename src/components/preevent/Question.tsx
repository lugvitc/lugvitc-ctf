import axios from "axios";
import { useState } from "react";

export interface QuestionData {
	title: string;
	description: string;
	points: number;
}

export interface QuestionProps {
	question: QuestionData;
	index: number;
}

export default function Question({ question, index }: QuestionProps) {
	const [flag, setFlag] = useState<string>("");
	const [regNo, setRegNo] = useState<string>("");

	const submit = () => {
		axios
			.post("http://localhost:5000/api/submit", {
				regNo: regNo,
				flag: flag,
				question: question.title,
			})
			.catch(() => {});
	};

	return (
		<div className="top-0 m-2 flex h-full w-full flex-col justify-between rounded-xl border border-gray-700 bg-slate-900 p-14 shadow-sm shadow-slate-700/[.7]">
			<div>
				<h3 className="text-center text-2xl font-bold text-white">
					{index + 1}. {question.title}
				</h3>
				<h3 className="mt-10 text-xl font-bold text-gray-300">Description</h3>
				<p className="mt-2 text-gray-300">{question.description}</p>
				<p className="mt-4 text-gray-500">Points: {question.points}</p>
			</div>
			<div>
				<div className="m-6 flex flex-row gap-4">
					<div className="flex w-full flex-col gap-2">
						<label>Reg no.</label>
						<input
							type="text"
							placeholder="23BAI1001"
							onChange={(e) => setRegNo(e.target.value)}
							className="block w-full rounded-lg border border-gray-600 bg-gray-700 p-2.5 text-sm text-white placeholder-gray-400"
						/>
					</div>
					<div className="flex w-full flex-col gap-2">
						<label>Flag</label>
						<input
							type="text"
							placeholder="flag{}"
							onChange={(e) => setFlag(e.target.value)}
							className="block w-full rounded-lg border border-gray-600 bg-gray-700 p-2.5 text-sm text-white placeholder-gray-400"
						/>
					</div>
				</div>
				<button
					onClick={submit}
					className="h-16 w-full rounded-xl bg-slate-800 text-xl font-bold text-white hover:bg-slate-700"
				>
					Submit
				</button>
			</div>
		</div>
	);
}
