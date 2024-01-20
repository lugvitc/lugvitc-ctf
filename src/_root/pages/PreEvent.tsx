import Question, { QuestionData } from "../../components/preevent/Question";
import { useEffect, useState } from "react";
import axios from "axios";
import bg from "../../assets/images/preevent-background.png";
import logo from "../../assets/icons/logo.png";
import long_lg from "../../assets/icons/long_logo.png";
// import coin from "../../assets/icons/coin.png";
import clubLogo from "../../assets/images/club-logo.png";

import { URL_ORIGIN } from "../../constants";
import toast from "react-hot-toast";

export default function PreEvent() {
	// const [coins, setCoins] = useState<number>(
	// 	localStorage.getItem("coins")
	// 		? parseInt(localStorage.getItem("coins") as string)
	// 		: 0,
	// );

	const [questions, setQuestions] = useState<QuestionData[]>([
		// {
		// 	title: "reuben",
		// 	description: "help me with this",
		// 	points: 200,
		// 	url: "https://www.google.com",
		// 	id: 1,
		// 	author: "reuben",
		// },
		// {
		// 	title: "reuben 2",
		// 	description: "send help please",
		// 	points: 300,
		// 	url: "https://www.google.com",
		// 	id: 2,
		// 	author: "reuben2",
		// },
		// {
		// 	title: "reuben 3",
		// 	description: "send help please",
		// 	points: 400,
		// 	url: "https://www.google.com",
		// 	id: 3,
		// 	author: "reuben3",
		// },
	]);
	const dateStr = formatDateToCustomFormat();
	const day: number = new Date().getDate();
	localStorage.setItem("day", day.toString());
	console.log(localStorage.getItem("day"));
	useEffect(() => {
		axios
			.get(`${URL_ORIGIN}/ctf/pre/today`)
			.then((res) => {
				setQuestions(res.data as QuestionData[]);
			})
			.catch((error) => {
				console.error(error);
			});
	}, []);

	// useEffect(() => {
	// 	type f = { coins: number };
	// 	let tag: string = JSON.parse(localStorage.getItem("data") as string)?.regNo;

	// 	if (tag)
	// axios.get<f>(`${URL_ORIGIN}/ctf/pre/coins/${tag}`)
	// // .then((res) => {
	// // 	if (res.status === 200) {
	// 		// localStorage.setItem("coins", res.data.coins.toString());
	// 		// setCoins(res.data.coins);
	// // 	}
	// // });
	// });

	const letters = "01";

	let interval: number = 0;

	function handleMouse(event: React.MouseEvent<HTMLHeadingElement>): void {
		let iteration = 0;

		clearInterval(interval);

		interval = setInterval(() => {
			if (event.target) {
				(event.target as HTMLElement).innerText = (
					event.target as HTMLElement
				).innerText
					.split("")
					.map((_: string, index: number) => {
						if (index < iteration) {
							return (
								(event.target as HTMLElement)?.dataset?.value?.[index] ?? ""
							);
						}

						return letters[Math.floor(Math.random() * 2)];
					})
					.join("");
			}

			if (
				event.target &&
				(event.target as HTMLElement).dataset.value &&
				iteration >=
					((event.target as HTMLElement)?.dataset?.value?.length ?? 0)
			) {
				clearInterval(interval);
			}

			iteration += 1 / 3;
		}, 50);
	}

	return (
		<div className="w-full bg-black-green">
			<img
				src={long_lg}
				className="fixed bottom-2 right-[-20vh] z-10 w-[20vh] origin-bottom-left -rotate-90"
			/>
			<div className="shadow-light-300 fixed z-50 flex h-auto w-full justify-between border-b-2 border-[#f8fafc0f] bg-[#0a1309bf] px-6 py-2 backdrop-blur-lg sm:px-8">
				<div className="flex items-center justify-center gap-4">
					<img src={clubLogo} className=" z-10 h-16 object-contain sm:h-20" />
					<span className="font-DM-Mono text-[20px] font-bold text-animation-green max-lg:hidden">
						Linux Club VITC
					</span>
				</div>
				<img
					src={logo}
					className="z-10 h-16 object-contain drop-shadow-4xl sm:h-20"
				/>
			</div>
			<div className="flex h-screen items-center justify-start bg-black-green">
				<div className="flex h-full basis-1/4 flex-col items-start justify-center self-start whitespace-nowrap uppercase max-md:hidden md:gap-20 md:pl-10 lg:basis-1/3 lg:gap-10 lg:pl-28">
					<h1
						className="phelix-boomgartner animate-glitch-anim-text text-white drop-shadow-3xl md:text-3xl lg:text-5xl xl:text-7xl"
						data-value="Password CTF"
						onMouseOver={handleMouse}
					>
						010101101010
					</h1>
					<h1 className="phelix-boomgartner animate-glitch-anim-text-2 text-white drop-shadow-3xl md:text-xl lg:text-3xl xl:text-5xl">
						Pre-Event CTF
					</h1>
					<h1 className="text-gray-300 drop-shadow-3xl md:text-xl lg:text-2xl xl:text-3xl">
						{dateStr}
					</h1>
					<p className="mt-4 italic text-gray-500 drop-shadow-3xl md:text-sm">
						Scroll down for questions
					</p>
				</div>
				<div
					className="absolute top-0 h-full w-full bg-cover bg-center bg-no-repeat md:left-1/3 md:w-2/3 lg:left-1/2 lg:w-1/2 "
					style={{
						backgroundImage: `linear-gradient(#00000000 80%, #000502), url(${bg})`,
					}}
				>
					<div className="before:absolute before:left-0 before:top-0 before:h-full before:w-full before:bg-green-400 before:mix-blend-color before:contrast-200"></div>
					<div className="flex h-full flex-col items-center justify-center gap-10 whitespace-nowrap uppercase md:hidden">
						<h1
							data-value="Password CTF"
							className="phelix-boomgartner animate-glitch-anim-text text-4xl tracking-wide text-white drop-shadow-3xl"
							onMouseOver={handleMouse}
						>
							01010110101010100
						</h1>
						<h1 className="phelix-boomgartner animate-glitch-anim-text-2 text-3xl text-white drop-shadow-3xl">
							Pre-Event CTF
						</h1>
						<h1 className="text-xl text-gray-300 drop-shadow-3xl">{dateStr}</h1>
						<p className="mt-4 text-gray-500 drop-shadow-3xl md:text-sm">
							Scroll down for questions
						</p>
					</div>
				</div>
			</div>
			<div className="relative flex h-full w-full flex-col items-center justify-center gap-10 p-10">
				{questions.map((question, i) => (
					<div key={i} className="relative w-full md:w-6/12">
						<Question
							question={question}
							// setCoins={setCoins}
							day={day}
						></Question>
					</div>
				))}
			</div>
			<div className="mb-5 mt-7 flex flex-col justify-start gap-2 px-8">
				{/* <div className="ml-8 flex h-6 w-36 items-center gap-4 font-source-code-pro">
					<span className="text-[#08FF08]"> Coins: </span>
					{coins}
					<img
						src={coin}
						alt=""
						className="-ml-2 h-10 w-10 object-contain transition-all duration-200 hover:-scale-x-100"
					/>
				</div> */}
				<p className="font-DM-Mono text-[#08FF08]">
					You may solve today&apos;s solved challenges again with some other
					credentials
				</p>
				<button
					className="ml-1 w-fit border-2 border-green-600 bg-transparent p-1 px-2 font-DM-Mono text-[#08FF08]"
					onClick={() => {
						localStorage.clear();
						toast.success("Logged out!");
						location.reload();
					}}
				>
					Solve again
				</button>
			</div>
		</div>
	);
}

function formatDateToCustomFormat(): string {
	const currentDate: Date = new Date();
	const day: number = currentDate.getDate();
	const monthIndex: number = currentDate.getMonth();
	const year: number = currentDate.getFullYear();

	const suffix: string = getDaySuffix(day);

	const monthNames: string[] = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	];

	const monthName: string = monthNames[monthIndex];

	const formattedDate: string = `${day}${suffix} of ${monthName}, ${year}`;
	return formattedDate;
}

function getDaySuffix(day: number): string {
	if (day >= 11 && day <= 13) {
		return "th";
	}

	switch (day % 10) {
		case 1:
			return "st";
		case 2:
			return "nd";
		case 3:
			return "rd";
		default:
			return "th";
	}
}
