import axios from "axios";
import { useState } from "react";

export interface QuestionData {
	id: number;
	name: string;
	description: string;
	points: number;
	author: string;
}

export interface QuestionProps {
	question: QuestionData;
	index: number;
}

interface PreeventResponse {
	msg_code: string;
	status?: boolean;
}

export default function Question({ question, index }: QuestionProps) {
	const [flag, setFlag] = useState<string>("");
	const [regNo, setRegNo] = useState<string>("");
	const [email, setEmail] = useState<string>("");
	const [isSolved, setIsSolved] = useState<boolean | undefined>(false);
	const [error, setError] = useState<string | undefined>(undefined);

	const submit = async (): Promise<void> => {
		try {
			const response: PreeventResponse = await axios.post(
				`http://localhost:5000/api/ctf/pre/${question.id}/flag`,
				{
					regNo: regNo,
					flag: flag,
					question: question.name,
					email: email,
				},
			);

			if (response && response.msg_code === "ctf_not_found") {
				setError("CTF not found");
			} else if (response && response.msg_code === "ctf_solved") {
				setIsSolved(response.status);
				setError("CTF already solved");
			} else {
				// question is solved
				setIsSolved(true);
				setError(undefined);
			}
		} catch (error) {
			console.error("Error submitting flag:", error);
			setError("An error occurred while submitting the flag");
		}
	};

	const handleClick = () => {
		submit().catch((error) =>
			console.error("Unhandled promise rejection:", error),
		);
	};

	return !isSolved ? (
		<div className="top-0 m-2 flex h-full w-full flex-col justify-between rounded-xl border border-gray-700 bg-slate-900 p-14 shadow-sm shadow-slate-700/[.7]">
			{error && <div className="text-red-500">{error}</div>}
			<div>
				<h3 className="text-center text-2xl font-bold text-white">
					{index + 1}. {question.name}
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
				<div className="mb-11 flex w-full flex-col gap-2">
					<label>Email</label>
					<input
						type="text"
						placeholder="example@example.com"
						onChange={(e) => setEmail(e.target.value)}
						className="block w-full rounded-lg border border-gray-600 bg-gray-700 p-2.5 text-sm text-white placeholder-gray-400"
					/>
				</div>
				<button
					onClick={handleClick}
					className="h-16 w-full rounded-xl bg-slate-800 text-xl font-bold text-white hover:bg-slate-700"
				>
					Submit
				</button>
			</div>
		</div>
	) : null;
}
