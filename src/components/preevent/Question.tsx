import axios from "axios";
import { useState } from "react";

export interface QuestionData {
	title: string;
	description: string;
	points: number;
	url: string;
	id: number;
}

export interface QuestionProps {
	question: QuestionData;
}

export default function Question({ question }: QuestionProps) {
	const [flag, setFlag] = useState<string>("");
	const [regNo, setRegNo] = useState<string>("");
	const [email, setEmail] = useState<string>("");
	const [submitted, setSubmitted] = useState<boolean>(false);

	const submit = (ev: React.FormEvent) => {
		ev.preventDefault();
		axios
			.post(`http://localhost:5000/api/ctf/pre/${question.id}/submit`, {
				regNo: regNo,
				flag: flag,
				email: email,
			})
			.then((res) => {
				if (res.status === 200) setSubmitted(true);
				else {
					alert("Incorrect flag, try again!");
				}
			})
			.catch(() => {
				alert(
					"Something went wrong while submitting the flag, no internet connection?",
				);
			});
		setEmail("");
		setFlag("");
		setEmail("");
	};

	return submitted ? (
		<>"Correct flag submitted :D"</>
	) : (
		<form
			className="flex flex-col items-center justify-center gap-3 px-4 pb-4 font-DM-Mono text-sm text-[#08FF08]"
			onSubmit={submit}
		>
			<input
				type="text"
				className="mt-1 block w-full border-2 border-green-600 bg-transparent p-1
			px-2 placeholder-green-500 outline-none transition-all duration-150 focus:border-[#08FF08]"
				placeholder="Registration Number"
				onChange={(e) => setRegNo(e.target.value)}
				value={regNo}
				required
			/>
			<input
				type="email"
				className="mt-1 block w-full border-2 border-green-600 bg-transparent p-1
			px-2 placeholder-green-500 outline-none transition-all duration-150 focus:border-[#08FF08]"
				placeholder="Email ID"
				onChange={(e) => setEmail(e.target.value)}
				value={email}
				required
			/>
			<input
				type="text"
				onChange={(e) => setFlag(e.target.value)}
				className="mt-1 block w-full border-2 border-green-600 bg-transparent p-1
			px-2 placeholder-green-500 outline-none transition-all duration-150 focus:border-[#08FF08]"
				placeholder="Flag"
				value={flag}
				required
			/>
			<button type="submit" className=" relative block h-8 overflow-hidden ">
				Submit
				<span className="relative -left-full top-1 block h-[2px] w-full animate-btn-anim-1 bg-gradient-to-r from-transparent to-[#03f40f]"></span>
			</button>
		</form>
	);
}
