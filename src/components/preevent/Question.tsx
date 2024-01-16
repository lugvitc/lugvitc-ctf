import axios from "axios";
import { useEffect, useState } from "react";
import { URL_ORIGIN } from "../../constants";
import Typewriter from "typewriter-effect";

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
	key: number;
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

export default function Question({
	question,
	setCoins,
	day,
	key,
}: QuestionProps) {
	const [display, setDisplay] = useState<boolean[]>([false, false]);
	const [flag, setFlag] = useState<string>("");
	const [regNo, setRegNo] = useState<string>(
		JSON.parse(localStorage.getItem("data") as string)
			? ((JSON.parse(localStorage.getItem("data") as string) as x)
					?.regNo as string)
			: "",
	);
	const [email, setEmail] = useState<string>(
		JSON.parse(localStorage.getItem("data") as string)
			? ((JSON.parse(localStorage.getItem("data") as string) as x)
					?.email as string)
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
				tag: regNo,
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

	useEffect(() => {
		setTimeout(() => {
			setDisplay([true]);
		}, 2200);

		setTimeout(() => {
			setDisplay((prev) => {
				return [...prev, true];
			});
		}, 6000);

		setTimeout(() => {
			setDisplay((prev) => {
				return [...prev, true];
			});
		}, 10000);
	}, []);
	return submitted ? (
		<div key={key}>Correct flag submitted :D</div>
	) : (
		<div
			key={key}
			className="min-h-72 h-full w-full rounded-3xl bg-[#08FF08] transition-all duration-150 hover:rounded-xl md:w-5/12"
		>
			<div className="h-full w-full rounded-xl bg-midnight-blue transition-all duration-150 hover:scale-[0.98] hover:shadow-custom">
				<div className=" flex items-center px-3 pt-3">
					<div className=" px-1 py-1">
						<span className="red box inline-block h-3 w-3 items-center rounded-full bg-red-600 p-1"></span>
					</div>
					<div className=" px-1 py-1">
						<span className="yellow box inline-block h-3 w-3 items-center rounded-full bg-yellow-500 p-1"></span>
					</div>
					<div className=" px-1 py-1">
						<span className="green box inline-block h-3 w-3 items-center rounded-full bg-green-500 p-1"></span>
					</div>
				</div>
				<div className="content mt-1 flex flex-col gap-3 px-4 py-2 font-source-code-pro text-white">
					<div className="flex gap-1 font-source-code-pro text-xs text-[#08FF08] md:text-sm lg:text-base">
						<span className="text-white">
							lug@ctf:<span className="font-bold text-sky-blue">~</span>${" "}
						</span>
						<Typewriter
							options={{
								strings: ["echo $USER"],
								// autoStart: true,
								loop: false,
								cursor: "", // Set the cursor to an empty string initially
							}}
							onInit={(typewriter) => {
								typewriter.typeString("echo $USER").start();
							}}
						/>
					</div>
					{display[0] && <div className="pl-4">{question.author}</div>}
					{display[0] && (
						<div className="flex gap-1 font-source-code-pro text-xs text-[#08FF08] md:text-sm lg:text-base">
							<span className="text-white">
								{question.author}@lugctf:
								<span className="font-bold text-sky-blue">~</span>$
							</span>
							<Typewriter
								options={{
									strings: ["echo $USER"],
									// autoStart: true,
									loop: false,
									cursor: "", // Set the cursor to an empty string initially
								}}
								onInit={(typewriter) => {
									typewriter
										.typeString(` sudo get-ctf --id ${key + 1}`)
										.start();
								}}
							/>
						</div>
					)}
					{display[1] && (
						<div className="pl-4">
							<div className="title text-xl font-bold">{question.title}</div>
							<div className="desc text-lg">{question.description}</div>
							<a className=" text-[#08FF08]" href={question.url}>
								Start at <span className="underline">{question.url}</span>
							</a>
						</div>
					)}
					{display[1] && (
						<div className="flex gap-1 font-source-code-pro text-base text-xs text-[#08FF08] md:text-sm lg:text-base">
							<span className="text-white">
								{question.author}@lugctf:
								<span className="font-bold text-sky-blue">~</span>$
							</span>
							<Typewriter
								options={{
									strings: ["echo $USER"],
									// autoStart: true,
									loop: false,
									cursor: "", // Set the cursor to an empty string initially
								}}
								onInit={(typewriter) => {
									typewriter
										.typeString(`sudo submit-flag --id ${question.id}`)
										.start();
								}}
							/>
						</div>
					)}
					{display[2] && (
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
							<button
								type="submit"
								className=" relative block h-8 overflow-hidden "
							>
								Submit
								<span className="relative -left-full top-1 block h-[2px] w-full animate-btn-anim-1 bg-gradient-to-r from-transparent to-[#03f40f]"></span>
							</button>
						</form>
					)}
				</div>
			</div>
		</div>
	);
}
