import axios from "axios";
import { useState } from "react";
import { URL_ORIGIN } from "../../constants";

export interface QuestionData {
	id: number;
	title: string;
	description: string;
	points: number;
	url: string;
	author: string;
}

export interface QuestionProps {
	question: QuestionData;
	setCoins: React.Dispatch<React.SetStateAction<number>>;
	day: number;
}

interface ResponseData {
	msg_Code?: number;
	status?: boolean;
	coins?: number;
}

type x = {
	regNo: string;
	email: string;
} | null;

export default function Question({ question, setCoins, day }: QuestionProps) {
	const [flag, setFlag] = useState<string>("");
	const [regNo, setRegNo] = useState<string>(
		JSON.parse(localStorage.getItem("data") as string)
			? (JSON.parse(localStorage.getItem("data") as string) as x)?.regNo as string
			: "",
	);
	const [email, setEmail] = useState<string>(
		JSON.parse(localStorage.getItem("data") as string)
			? (JSON.parse(localStorage.getItem("data") as string) as x)?.email as string
			: "",
	);
	const [submitted, setSubmitted] = useState<boolean>(
		localStorage.getItem("day") === day.toString() &&
			localStorage.getItem(`${question.id}`)
			? true
			: false,
	);

	const submit = (ev: React.FormEvent) => {
		ev.preventDefault();
		axios
			.post<ResponseData>(`${URL_ORIGIN}/ctf/pre/${question.id}/flag`, {
				regNo: regNo,
				flag: flag,
				email: email,
			})
			.then((res) => {
				if ((res.data.status as boolean) === true) {
					setSubmitted(true);
					setCoins(() => {
						localStorage.setItem(
							`${question.id}`,
							JSON.stringify({ solved: true }),
						);
						localStorage.setItem("coins", JSON.stringify(res.data.coins));
						return res.data.coins as number;
					});
				} else if (res.status >= 500) {
					alert("Something went down, we'll be back soon!");
				} else {
					alert("Incorrect flag, try again!");
				}
			})
			.catch(() => {
				alert(
					"Something went wrong while submitting the flag, no internet connection?",
				);
			});

		localStorage.setItem(
			"data",
			JSON.stringify({ regNo: regNo, email: email }),
		);

		// setRegNo("");
		setFlag("");
		// setEmail("");
	};

	return submitted ? (
		<>Correct flag submitted :D</>
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
