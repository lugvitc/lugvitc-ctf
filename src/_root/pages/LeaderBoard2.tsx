/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { URL_ORIGIN } from "../../constants";
import { useGlitch } from "react-powerglitch";
import Typewriter from "typewriter-effect";
import eventLogo from "../../assets/images/passwordctf-logo.png";
import {
	MetaLeaderboardResponse,
	R2LeaderboardResponse,
	FinalLeaderboard,
} from "../../types";

const Leaderboard2 = () => {
	const glitch = useGlitch();
	const [metaleaderboardData, setMetaleaderboardData] = useState<
		MetaLeaderboardResponse[]
	>([]);

	const [r2Leaderboard, setr2Leaderboard] = useState<R2LeaderboardResponse[]>(
		[],
	);
	const [finalLeaderboard, setFinalLeaderboard] = useState<FinalLeaderboard[]>(
		[],
	);
	const [sortedLeaderboard, setSortedLeaderboard] = useState<
		FinalLeaderboard[]
	>([]);
	const [isPageVisible, setIsPageVisible] = useState(true);
	const [intervalId, setIntervalId] = useState<number>(0);

	const fetchData = () => {
		calculate();
		sorting();
		axios
			.get<MetaLeaderboardResponse[]>(`${URL_ORIGIN}/leaderboard`)
			.then((response) => response.data)
			.then((data) => setMetaleaderboardData(data))
			.catch((error) => console.error("Error fetching data:", error));
		axios
			.get<R2LeaderboardResponse[]>(`${URL_ORIGIN}/round2/meat_lb`)
			.then((response) => response.data)
			.then((data) => setr2Leaderboard(data))
			.catch((error) => console.error("Error fetching data:", error));
	};

	useEffect(() => {}, [metaleaderboardData, r2Leaderboard]);
	const calculate = () => {
		setFinalLeaderboard(
			metaleaderboardData.map((team: MetaLeaderboardResponse) => {
				let total_points = 0;
				for (let i = 0; i < r2Leaderboard.length; i++) {
					if (r2Leaderboard[i].name === team.meta_team__name) {
						total_points = team.tpoints + r2Leaderboard[i].points;
					}
				}
				return {
					name: team.name,
					total_points: total_points,
					meta_team__name: team.meta_team__name,
				};
			}),
		);
	};

	const sorting = () => {
		setSortedLeaderboard(
			finalLeaderboard.sort((a, b) => {
				return b.total_points - a.total_points;
			}),
		);
		setr2Leaderboard(
			r2Leaderboard.sort((a, b) => {
				return b.points - a.points;
			}),
		);
		console.log(sortedLeaderboard);
	};
	useEffect(() => {
		if (isPageVisible) {
			if (document.visibilityState === "visible") {
				const id = setInterval(() => {
					fetchData();
					if (!isPageVisible) clearInterval(id);
				}, 1500);
				console.log(id);
				setIntervalId(id);
			} else {
				if (intervalId) {
					clearInterval(intervalId);
					setIntervalId(0);
				}
			}
		}
		return () => {
			if (intervalId) {
				clearInterval(intervalId);
			}
		};
	}, [isPageVisible]);

	useEffect(() => {
		const handleVisibilityChange = () => {
			setIsPageVisible(false);
			if (document.visibilityState === "visible") {
				// Page is visible, start the interval
				const id = setInterval(() => {
					fetchData();
				}, 1500);
				setIntervalId(id);
			} else {
				// Page is not visible, clear the interval
				if (intervalId) {
					clearInterval(intervalId);
					setIntervalId(0);
				}
			}
		};
		// Add event listener for visibility change
		document.addEventListener("visibilitychange", handleVisibilityChange);

		// Cleanup: Remove event listener and clear interval when the component unmounts
		return () => {
			document.removeEventListener("visibilitychange", handleVisibilityChange);

			if (intervalId) {
				clearInterval(intervalId);
			}
		};
	}, [intervalId]);

	return (
		<div className="relative z-0 flex min-h-screen w-full min-w-full flex-col items-center justify-center bg-midnight-blue bg-leaderboard bg-cover bg-fixed bg-no-repeat">
			<div
				ref={glitch.ref}
				className="fixed left-0 top-0 -z-20 h-96 w-full animate-leader-anime rounded-l bg-opacity-0 bg-gradient-to-b from-transparent to-[#03f40f20] blur-lg"
			></div>
			<div className="flex h-full min-h-screen w-full flex-col items-center justify-center gap-10 p-10 pt-20 sm:gap-20 sm:p-20">
				<div className="flex gap-1 self-start font-source-code-pro text-sm text-[#08FF08] md:text-2xl lg:text-4xl">
					<span className="text-red-700">
						lugvitc@ctf:<span className="font-bold text-sky-blue">~</span>${" "}
					</span>
					<span>sudo get-hackerboard</span>
					<Typewriter
						options={{
							strings: [""],
							// autoStart: true,
							loop: false,
							cursor: "|", // Set the cursor to an empty string initially
							delay: 50,
						}}
						onInit={(typewriter) => {
							typewriter.typeString("").start();
						}}
					/>
				</div>
				{r2Leaderboard?.length >= 3 && (
					<div className="top3 relative flex h-full w-full items-center justify-center gap-2 font-DM-Mono text-lg font-extrabold uppercase sm:gap-10 sm:text-2xl">
						<div className="flex h-full w-full flex-col items-center justify-center transition-all duration-200 hover:scale-125 hover:drop-shadow-circle">
							<div className="relative h-24 w-24 rounded-full border-4 border-fluorescent-green bg-black sm:h-40 sm:w-40">
								<div className="h-full w-full before:absolute before:left-0 before:top-0 before:h-full before:w-full before:rounded-full before:bg-silver before:mix-blend-color">
									<img
										src={eventLogo}
										alt=""
										className=" h-full w-full object-contain"
									/>
								</div>
							</div>
							<div className=" rounded-lg py-2 text-fluorescent-green ">
								{r2Leaderboard[1].name}
							</div>
						</div>
						<div className="flex h-full w-full flex-col items-center justify-center transition-all duration-200 hover:scale-125 hover:drop-shadow-circle">
							<div className="relative h-32 w-32 rounded-full border-4 border-fluorescent-green bg-black sm:h-48 sm:w-48">
								<div className="h-full w-full before:absolute before:left-0 before:top-0 before:h-full before:w-full before:rounded-full before:bg-gold before:mix-blend-color">
									<img
										src={eventLogo}
										alt=""
										className="h-full w-full object-contain"
									/>
								</div>
							</div>
							<div className=" rounded-lg py-2 text-fluorescent-green ">
								{r2Leaderboard[0].name}
							</div>
						</div>
						<div className="flex h-full w-full flex-col items-center justify-center transition-all duration-200 hover:scale-125 hover:drop-shadow-circle">
							<div className="relative h-24 w-24 rounded-full border-4 border-fluorescent-green bg-black sm:h-40 sm:w-40">
								<div className="h-full w-full before:absolute before:left-0 before:top-0 before:h-full before:w-full before:rounded-full before:bg-bronze before:mix-blend-color">
									<img
										src={eventLogo}
										alt=""
										className="h-full w-full object-contain"
									/>
								</div>
							</div>
							<div className=" rounded-lg py-2 text-fluorescent-green ">
								{r2Leaderboard[2].name}
							</div>
						</div>
					</div>
				)}
				<div className="h-full w-full overflow-auto rounded-xl p-6 pt-0 ">
					<div className="flex h-full w-full flex-col items-center border-4 border-fluorescent-green text-fluorescent-green">
						<div className="h-full w-full bg-green-900">
							<div className="phelix-boomgartner m-4 mt-2 flex h-full items-center justify-center text-3xl uppercase drop-shadow-black sm:text-5xl md:text-5xl lg:m-6 lg:text-6xl xl:text-7xl">
								Meta-Team-HackerBoard
							</div>
							<div className="flex w-full font-source-code-pro text-sm font-bold uppercase drop-shadow-black md:text-lg lg:text-2xl">
								<div className="custom-scrollbar w-full basis-1/5 overflow-auto whitespace-nowrap border-2 border-l-0 border-fluorescent-green px-2 py-4 text-center">
									[Ranking]
								</div>
								<div className="custom-scrollbar w-full basis-3/5 overflow-auto whitespace-nowrap border-2 border-fluorescent-green px-2 py-4 text-center">
									[Meta_Team]
								</div>
								<div className="custom-scrollbar w-full basis-1/5 overflow-auto whitespace-nowrap border-2 border-r-0 border-fluorescent-green px-2 py-4 text-center">
									[Points]
								</div>
							</div>
						</div>
						<div className="flex h-full w-full flex-col bg-black bg-opacity-50 font-source-code-pro">
							{r2Leaderboard &&
								r2Leaderboard.map((team, index) => (
									<div
										className="flex w-full drop-shadow-3xl sm:text-3xl"
										key={index}
									>
										<div className="custom-scrollbar w-full basis-1/5 overflow-auto whitespace-nowrap border-2 border-l-0 border-fluorescent-green border-opacity-50 px-2 py-3 text-center">
											{index + 1}
										</div>
										<div className="custom-scrollbar w-full basis-3/5 overflow-auto whitespace-nowrap border-2 border-fluorescent-green border-opacity-50 px-2 py-3 text-center">
											{team.name}
										</div>
										<div className="custom-scrollbar w-full basis-1/5 overflow-auto whitespace-nowrap border-2 border-r-0 border-fluorescent-green border-opacity-50 px-2 py-3 text-center">
											{team.points}
										</div>
									</div>
								))}
						</div>
					</div>
				</div>
				<div className="h-full w-full overflow-auto rounded-xl p-6 pt-0 ">
					<div className="flex h-full w-full flex-col items-center border-4 border-fluorescent-green text-fluorescent-green">
						<div className="h-full w-full bg-green-900">
							<div className="phelix-boomgartner m-6 mt-2 flex h-full items-center justify-center text-3xl uppercase drop-shadow-black sm:text-5xl md:text-6xl lg:text-8xl">
								HackerBoard
							</div>
							<div className="flex w-full font-source-code-pro text-sm font-bold uppercase drop-shadow-black md:text-lg lg:text-2xl">
								<div className="custom-scrollbar w-1/6 basis-1/6 overflow-auto whitespace-nowrap border-2 border-l-0 border-fluorescent-green px-2 py-4 text-center">
									[Ranking]
								</div>
								<div className="custom-scrollbar w-2/6 basis-2/6 overflow-auto whitespace-nowrap border-2 border-fluorescent-green px-2 py-4 text-center">
									[Team]
								</div>
								<div className="custom-scrollbar w-1/6 basis-1/6 overflow-auto whitespace-nowrap border-2 border-r-0 border-fluorescent-green px-2 py-4 text-center">
									[Points]
								</div>
								<div className="custom-scrollbar w-2/6 basis-2/6 overflow-auto whitespace-nowrap border-2 border-r-0 border-fluorescent-green px-2 py-4 text-center">
									[Meta_Team]
								</div>
							</div>
						</div>
						<div className="flex h-full w-full flex-col bg-black bg-opacity-50 font-source-code-pro">
							{metaleaderboardData &&
								sortedLeaderboard.map((team, index) => (
									<div
										className="flex w-full drop-shadow-3xl sm:text-2xl"
										key={index}
									>
										<div className="custom-scrollbar  flex w-1/6 basis-1/6 items-center justify-center overflow-auto whitespace-nowrap border-2 border-l-0 border-fluorescent-green border-opacity-50 px-2 py-3 text-center">
											{index + 1}
										</div>
										<div className="custom-scrollbar flex w-2/6 basis-2/6 flex-col items-start justify-center gap-2 overflow-auto whitespace-nowrap border-2 border-fluorescent-green border-opacity-50 px-2 py-3 text-center">
											{team.name}
										</div>
										<div className="custom-scrollbar flex w-1/6 basis-1/6 items-center justify-center overflow-auto whitespace-nowrap border-2 border-r-0 border-fluorescent-green border-opacity-50 px-2 py-3 text-center">
											{team.total_points}
										</div>
										<div className="custom-scrollbar flex w-2/6 basis-2/6 items-center justify-center overflow-auto whitespace-nowrap border-2 border-r-0 border-fluorescent-green border-opacity-50 px-2 py-3 text-center">
											{team.meta_team__name}
										</div>
									</div>
								))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Leaderboard2;
