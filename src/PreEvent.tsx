import Question, { QuestionData } from "./components/preevent/Question";
import Navbar from "./components/Navbar/Navbar";
import { useEffect, useState } from "react";
import axios from "axios";
import bg from "./assets/images/preevent-background.png";
import { backend } from "./constants";

export default function PreEvent() {
	const [questions, setQuestions] = useState<QuestionData[]>([
		// {
		// 	title: "reuben",
		// 	description: "help me with this",
		// 	points: 200,
		// 	url: "https://www.google.com",
		// 	id: 1,
		// },
		// {
		// 	title: "reuben 2",
		// 	description: "send help please",
		// 	points: 300,
		// 	url: "https://www.google.com",
		// 	id: 2,
		// },
		// {
		// 	title: "reuben 3",
		// 	description: "send help please",
		// 	points: 400,
		// 	url: "https://www.google.com",
		// 	id: 3,
		// },
	]);
	const dateStr = formatDateToCustomFormat();

	useEffect(() => {
		axios
			.get(`http://${backend}/api/ctf/pre/today`)
			.then((res) => {
				setQuestions(res.data as QuestionData[]);
			})
			.catch(() => {});
	});

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
		<div className="bg-black">
			<Navbar />
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
					<p className="mt-4 text-gray-500 drop-shadow-3xl md:text-sm">
						Scroll down for questions
					</p>
				</div>
				<div
					className="absolute top-0 h-full w-full bg-cover bg-center bg-no-repeat md:left-1/3 md:w-2/3 lg:left-1/2 lg:w-1/2 "
					style={{ backgroundImage: `url(${bg})` }}
				>
					<div className="before:absolute before:left-0 before:top-0 before:h-full before:w-full before:bg-green-400 before:mix-blend-color before:contrast-200"></div>
					<div className="flex h-full flex-col items-center justify-center gap-10 whitespace-nowrap uppercase md:hidden">
						<h1
							data-value="Password CTF"
							className="phelix-boomgartner animate-glitch-anim-text text-4xl tracking-wide text-white"
							onMouseOver={handleMouse}
						>
							010101101010
						</h1>
						<h1 className="phelix-boomgartner animate-glitch-anim-text-2 text-3xl text-white">
							Pre-Event CTF
						</h1>
						<h1 className="text-xl text-gray-300">{dateStr}</h1>
						<p className="mt-4 text-gray-500 md:text-sm">
							Scroll down for questions
						</p>
					</div>
				</div>
			</div>
			<div className="flex h-full w-full flex-wrap items-center justify-center gap-20 p-10">
				{questions.map((question, i) => (
					<div
						key={i}
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
							<div className="conten mt-1 flex flex-col gap-3 px-4 py-2 font-source-code-pro text-white">
								<div className="font-source-code-pro text-[#08FF08]">
									<span className="text-white">
										lug@ctf:<span className="font-bold text-sky-blue">~</span>$
									</span>
									{` sudo get-ctf --id ${i + 1}`}
								</div>
								<div className="pl-4">
									<div className="title text-xl font-bold">
										{question.title}
									</div>
									<div className="desc text-lg">{question.description}</div>
									<a className=" text-[#08FF08]" href={question.url}>
										Start at <span className="underline">{question.url}</span>
									</a>
								</div>
								<div className="sikka"></div>
								<div className="url text-base">
									<span className="text-white">
										lug@ctf:<span className="font-bold text-sky-blue">~</span>$
									</span>{" "}
									<span className="text-[#08FF08]">
										sudo submit-flag --id {question.id}
									</span>
								</div>
								<Question question={question}></Question>
							</div>
						</div>
					</div>
				))}
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

{
	/* <Question question={question} index={i} /> */
}
