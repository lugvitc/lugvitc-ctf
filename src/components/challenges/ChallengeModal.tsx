import axios, { AxiosError, AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import "./color.css";
import Typewriter from "typewriter-effect";
import { URL_ORIGIN } from "../../constants";
import toast, { Toaster } from "react-hot-toast";
import { TOAST_MESSAGES } from "../../constants";
import {
	ChallengeModalProp,
	ResponseData,
	StopResponseData,
	hintResponseData,
	FlagResponse,
	Hints,
} from "../../types";
import React from "react";
import coinImg from "../../assets/icons/coin.png";
import { TeamResponse } from "../../types";

export const ChallengeModal = ({
	question,
	isClicked,
	isStart,
	handleStartChange,
	closeModal,
	handleSolved,
}: ChallengeModalProp) => {
	// console.log(question);
	// const [isStart, setIsStart] = useState<boolean>(false);
	const [hints, setHints] = useState<{ [key: number]: string }>({});

	const [selectedHint, setSelectedHint] = useState<number | null>(null);
	const [flag, setFlag] = useState<string>("");
	const [coins, setCoins] = useState<number | null>(0);

	// const handleCloseModal = () => {

	// 	setIsStart(false);
	// 	setSelectedHint(null);
	// };

	const hintList = [0, 1, 2];
	const [viewedHintsFetch, setviewedHintsFetch] = useState<number | null>(null);
	const [portsFetched, setPortsFetched] = useState<number[] | undefined>([]);
	const [refreshKey, setRefreshKey] = useState(0);
	const [isLoading, setIsLoading] = useState(false);

	const handleHintClick = (hintNumber: number) => {
		// Try to get the hint from localStorage first
		const storedHints: Hints = JSON.parse(
			localStorage.getItem(`hints_${question.id}`) || "{}",
		) as Hints;

		if (storedHints[hintNumber]) {
			// console.log("Hint:", storedHints[hintNumber]);
			setSelectedHint(hintNumber);
		} else {
			const jwt = localStorage.getItem("jwt_token");
			axios
				.get(`${URL_ORIGIN}/ctf/${question.id}/hint`, {
					headers: {
						Authorization: `Bearer ${jwt}`,
					},
				})
				.then((response: AxiosResponse<hintResponseData>) => {
					if (response.data.msg_code === 2) {
						toast(`${TOAST_MESSAGES.CTF_NOT_FOUND}`);
					} else if (response.status === 9) {
						toast(`${TOAST_MESSAGES.HINT_LIMIT_REACHED}`);
					} else if (response.data.text) {
						// previous hints + new hint
						const newHints = {
							...storedHints,

							[response.data.order as number]: response.data.text,
						};
						// new hints in localStorage
						localStorage.setItem(
							`hints_${question.id}`,
							JSON.stringify(newHints),
						);
						setHints(newHints);
						setSelectedHint(hintNumber);

						const viewedHintsCount = Object.keys(newHints).length;

						setRefreshKey((prevKey) => prevKey + 1);
						// console.log(viewedHintsCount);
						setviewedHintsFetch(viewedHintsCount);
					}
				})
				.catch((error: AxiosError<ResponseData>) => {
					if (error.status === 403) toast(`Hint does not exist`);
					else toast("Unknown error");
					console.log(error);
				});
		}
	};
	const getHintFromLocalStorage = (selectedHint: number) => {
		const hintsFromStorage = localStorage.getItem(`hints_${question.id}`);

		if (!hintsFromStorage) {
			toast("Hint is not available");
			return;
		} else {
			const hints: Hints = JSON.parse(hintsFromStorage) as Hints;
			return hints[selectedHint];
		}
	};
	const handleFlagSubmit = (e: React.MouseEvent) => {
		const jwt = localStorage.getItem("jwt_token");
		axios
			.post(
				`${URL_ORIGIN}/ctf/${question.id}/flag`,
				{ flag: flag },
				{
					headers: {
						Authorization: `Bearer ${jwt}`,
					},
				},
			)
			.then((response: AxiosResponse<FlagResponse>) => {
				if (response.data.status === true) {
					toast(`${TOAST_MESSAGES.CTF_SOLVED}`);
					setTimeout(() => {
						closeModal(e);
						handleSolved();
					}, 1500);
				} else {
					toast("Incorrect Flag");
				}
			})
			.catch((error: AxiosError<ResponseData>) => {
				if (error.response.data.msg_code === 2) {
					toast(`${TOAST_MESSAGES.CTF_NOT_FOUND}`);
				} else if (error.response.data.msg_code === 12) {
					toast(`${TOAST_MESSAGES.CTF_SOLVED}`);
					setTimeout(() => {
						closeModal(e);
						handleSolved();
					}, 1500);
				} else {
					toast("Unknown Error occured, no internet maybe?");
				}
			});
	};

	const startContainer = () => {
		const jwt = localStorage.getItem("jwt_token");
		setIsLoading(true);
		axios
			.post(
				`${URL_ORIGIN}/ctf/${question.id}/start`,
				{},
				{
					headers: {
						Authorization: `Bearer ${jwt}`,
					},
				},
			)
			.then((response: AxiosResponse<ResponseData>) => {
				if (response.data.msg_code === 2) {
					toast(`${TOAST_MESSAGES.CTF_NOT_FOUND}`);
				} else if (response.data.msg_code === 7) {
					toast(`${TOAST_MESSAGES.CONTAINER_ALREADY_RUNNING}`);
				} else if (response.data.msg_code === 8) {
					toast(`${TOAST_MESSAGES.CONTAINER_LIMIT_REACHED}`);
				} else if (response.data.msg_code === 0) {
					toast(`${TOAST_MESSAGES.DB_ERROR}`);
				} else if (response.data.msg_code === 3) {
					toast(`${TOAST_MESSAGES.CONTAINER_START}`);

					const ports = response.data.ports;
					setIsLoading(false);
					toast("Container is running");
					setPortsFetched(ports);
				}
			})
			.catch((error) => {
				setIsLoading(false);
				handleStartChange(question.id, false);
				toast("Failed to start container");
				console.log(error);
			});
	};
	const stopContainer = () => {
		const jwt = localStorage.getItem("jwt_token");

		axios
			.post(
				`${URL_ORIGIN}/ctf/${question.id}/stop`,
				{},
				{
					headers: {
						Authorization: `Bearer ${jwt}`,
					},
				},
			)
			.then((response: AxiosResponse<StopResponseData>) => {
				if (response.data.msg_code === 2) {
					toast(`${TOAST_MESSAGES.CTF_NOT_FOUND}`);
				} else if (response.data.msg_code === 6) {
					toast(`${TOAST_MESSAGES.CONTAINER_NOT_FOUND}`);
				} else if (response.data.msg_code === 0) {
					toast(`${TOAST_MESSAGES.DB_ERROR}`);
				} else if (response.data.msg_code === 4) {
					toast(`${TOAST_MESSAGES.CONTAINER_STOP}`);
				}
			})
			.catch((error) => {
				console.error("Failed to stop container", error);
			});
	};
	useEffect(() => {
		// viewed hints from the server
		const jwt = localStorage.getItem("jwt_token");
		axios
			.get(`${URL_ORIGIN}/ctf/${question.id}/viewed_hints`, {
				headers: {
					Authorization: `Bearer ${jwt}`,
				},
			})
			.then((response: AxiosResponse<hintResponseData[]>) => {
				const viewedHints = response.data.reduce((acc, hint) => {
					console.log(hint);
					if (hint.order !== undefined) {
						return { ...acc, [hint.order]: hint.text };
					} else {
						return acc;
					}
				}, {});

				const storedHints: Hints = JSON.parse(
					localStorage.getItem(`hints_${question.id}`) || "{}",
				) as Hints;

				// Merging viewed hints with the stored hints
				const mergedHints = { ...storedHints, ...viewedHints };

				// Storing the merged hints in localStorage
				localStorage.setItem(
					`hints_${question.id}`,
					JSON.stringify(mergedHints),
				);

				setHints(mergedHints);
				const viewedHintsCount = Object.keys(mergedHints).length;
				// const availableHints = 3 - viewedHintsCount;
				console.log(viewedHintsCount);
				setviewedHintsFetch(viewedHintsCount);
			})
			.catch((error) => {
				console.error("Failed to fetch viewed hints", error);
			});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		const jwt = localStorage.getItem("jwt_token");
		axios
			.get<TeamResponse>(`${URL_ORIGIN}/team/me`, {
				headers: {
					Authorization: `Bearer ${jwt}`,
				},
			})
			.then((response) => response.data)
			.then((res) => setCoins(res.coins))
			.catch((error) => {
				console.log(error);
			});
	}, [refreshKey]);

	return (
		<React.Fragment>
			{isClicked && (
				<>
					<div className=" add-color crtBackground fixed inset-0 left-[15%] top-[15%] z-50 h-3/4 w-3/4 overflow-x-hidden overflow-y-hidden rounded-md bg-black p-2 after:pointer-events-none after:absolute after:h-full after:w-full after:animate-crtAnimation after:content-['']">
						<div className="  h-full  animate-tv-flicker bg-black-green  p-20 text-xl text-[#dbfa8e] drop-shadow-3xl-v2 ">
							<div className=" flex w-full flex-col gap-4">
								<div className="mb-4 flex items-center justify-between text-[25px]">
									<Typewriter
										options={{
											strings: ["Question Name"],
											// autoStart: true,
											loop: false,
											cursor: "",
											delay: 25,
										}}
										onInit={(typewriter) => {
											typewriter.typeString(question.name).start();
										}}
									/>
									<div className="flex gap-8">
										<div className="flex h-[50px] items-center justify-center gap-4 border border-[#dbfa8e] bg-transparent p-4 px-4 text-[15px] text-[#dbfa8e] ">
											<img src={coinImg} alt="coin" className=" h-[30px]" />
											<span>{coins}</span>
										</div>

										<div className="flex h-[50px] w-[10rem] items-center justify-center rounded-sm border border-[#dbfa8e] bg-transparent px-4 text-[15px] text-[#dbfa8e] transition delay-75 hover:bg-[#dbfa8e] hover:text-[#006400]">
											Points: {question.points}
										</div>
									</div>
								</div>
								<div className="text-[20px]">
									<Typewriter
										options={{
											strings: ["Author"],
											// autoStart: true,
											loop: false,
											cursor: "",
											delay: 25,
										}}
										onInit={(typewriter) => {
											typewriter
												.typeString(`Author: ${question.author}`)
												.start();
										}}
									/>
								</div>
								<div className="text-[20px]">
									<Typewriter
										options={{
											strings: ["Description"],
											// autoStart: true,
											loop: false,
											cursor: "|",
											delay: 25,
										}}
										onInit={(typewriter) => {
											typewriter
												.typeString(`Description: ${question.description}`)
												.start();
										}}
									/>
								</div>
								{coins !== null && coins < 100 ? (
									<div className="text-[20px]">
										<Typewriter
											options={{
												strings: "Coins",
												// autoStart: true,
												loop: false,
												cursor: "|",
												delay: 25,
											}}
											onInit={(typewriter) => {
												typewriter
													.typeString(
														`Note: You don't have enough coins to purchase hints`,
													)
													.start();
											}}
										/>
									</div>
								) : null}
								{/* -------------------PORTS--------------------------------- */}
								{portsFetched && portsFetched.length > 0 ? (
									<div className="text-[20px]">
										<Typewriter
											options={{
												strings: "Ports",
												// autoStart: true,
												loop: false,
												cursor: "|",
												delay: 25,
											}}
											onInit={(typewriter) => {
												typewriter
													.typeString(`Port: ${portsFetched?.join(",")}`)
													.start();
											}}
										/>
									</div>
								) : null}
								<div className="mt-10 flex justify-between">
									<div className=" flex gap-4">
										<input
											type="text"
											placeholder="flag{}"
											onChange={(e) => {
												setFlag(e.target.value);
											}}
											className="z-10 h-[47px] w-[15rem] rounded-sm border border-[#dbfa8e] bg-transparent px-4 text-[#dbfa8e]"
										/>
										<Toaster />
										<button
											className="z-10 h-[47px] w-[15rem] rounded-sm border border-[#dbfa8e] bg-transparent px-4 text-[#dbfa8e] hover:bg-[#dbfa8e] hover:text-[#006400]"
											onClick={(e) => handleFlagSubmit(e)}
										>
											Submit
										</button>
									</div>
									<button
										className=" h-[47px] w-1/4 rounded-sm border border-[#dbfa8e] bg-transparent px-4 text-[#dbfa8e] transition delay-75 hover:bg-[#dbfa8e] hover:text-[#006400]"
										onClick={() => {
											const newStartState = !isStart;
											handleStartChange(question.id, newStartState);
											if (isStart) {
												stopContainer();
											} else {
												startContainer();
											}
										}}
									>
										{isLoading ? (
											<span>Loading...</span>
										) : isStart ? (
											<span>Stop</span>
										) : (
											<span>Start</span>
										)}
									</button>
								</div>
							</div>

							<div className="my-16 flex items-center justify-center gap-4">
								{hintList.map((hint) => {
									const isDisabled =
										((hint === 1 || hint === 2) && viewedHintsFetch === 0) ||
										(hint === 2 && viewedHintsFetch === 1);
									return (
										<button
											className={`h-16 w-16 rounded-sm border ${
												isDisabled ? " pointer-events-none" : ""
											} border-[#dbfa8e] bg-transparent px-4 text-[#dbfa8e] transition delay-75 hover:bg-[#dbfa8e] hover:text-[#006400]`}
											key={hint}
											onClick={() => {
												if (isDisabled) {
													return;
												}
												handleHintClick(hint);
											}}
										>
											{hint + 1}
										</button>
									);
								})}
							</div>
							<p>
								{selectedHint !== null &&
								hints[selectedHint] &&
								localStorage.getItem(`hints_${question.id}`)
									? `${getHintFromLocalStorage(selectedHint)}`
									: ``}
							</p>
						</div>
					</div>

					<div
						className={`fixed inset-0 z-40 bg-black bg-opacity-50 backdrop-blur-sm ${
							isClicked ? "" : "hidden"
						}`}
						onClick={(e) => closeModal(e)}
					/>
				</>
			)}
		</React.Fragment>
	);
};
