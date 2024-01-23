import axios, { AxiosResponse } from "axios";
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

export const ChallengeModal = ({
	question,
	isClicked,
	closeModal,
}: ChallengeModalProp) => {
	const [isStart, setIsStart] = useState<boolean>(false);
	const [hints, setHints] = useState<{ [key: number]: string }>({});

	const [selectedHint, setSelectedHint] = useState<number | null>(null);
	const [flag, setFlag] = useState<string>("");

	// const handleCloseModal = () => {

	// 	setIsStart(false);
	// 	setSelectedHint(null);
	// };

	const hintList: number[] = [1, 2, 3];

	const handleHintClick = (hintNumber: number) => {
		// Try to get the hint from localStorage first
		const storedHints: Hints = JSON.parse(
			localStorage.getItem(`hints_${question.id}`) || "{}",
		) as Hints;

		if (storedHints[hintNumber]) {
			console.log("Hint:", storedHints[hintNumber]);
			setSelectedHint(hintNumber);
		} else {
			axios
				.get(`${URL_ORIGIN}/ctf/${question.id}/hint`)
				.then((response: AxiosResponse<hintResponseData>) => {
					if (response.data.msg_code === 2) {
						toast(`${TOAST_MESSAGES.CTF_NOT_FOUND}`);
					} else if (response.status === 9) {
						toast(`${TOAST_MESSAGES.HINT_LIMIT_REACHED}`);
					} else if (response.data.text) {
						// previous hints + new hint
						const newHints = {
							...storedHints,
							[hintNumber]: response.data.text,
						};
						// new hints in localStorage
						localStorage.setItem(
							`hints_${question.id}`,
							JSON.stringify(newHints),
						);
						setHints(newHints);
						setSelectedHint(hintNumber);
					}
				})
				.catch((error) => {
					console.error("Failed to fetch hint", error);
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
		axios
			.post(`/ctf/${question.id}/flag`, flag)
			.then((response: AxiosResponse<FlagResponse>) => {
				if (response.data.msg_code === 2) {
					toast(`${TOAST_MESSAGES.CTF_NOT_FOUND}`);
				} else if (response.data.msg_code === 12) {
					toast(`${TOAST_MESSAGES.CTF_SOLVED}`);
					setTimeout(() => {
						closeModal(e);
					}, 1500);
				} else if (response.data.status) {
					console.log(response.data.status);
				}
			})
			.catch((error) => {
				console.log(error);
			});
	};

	const startContainer = () => {
		const jwt = localStorage.getItem("jwt_token");
		axios
			.post(
				`${URL_ORIGIN}/${question.id}/start`,
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
				}
				const ports = response.data.ports;
				const ctf_id = response.data.ctf_id;

				console.log(ports, ctf_id);
			})
			.catch((error) => {
				console.error("Failed to start container", error);
			});
	};
	const stopContainer = () => {
		const jwt = localStorage.getItem("jwt_token");
		axios
			.post(
				`${URL_ORIGIN}/${question.id}/stop`,
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
		axios
			.get(`${URL_ORIGIN}/ctf/${question.id}/viewed-hints`)
			.then((response: AxiosResponse<hintResponseData[]>) => {
				const viewedHints = response.data.reduce((acc, hint) => {
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
			})
			.catch((error) => {
				console.error("Failed to fetch viewed hints", error);
			});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

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
											typewriter.typeString("Question Name").start();
										}}
									/>
									<div className="flex h-[47px] w-[10rem] items-center justify-center rounded-sm border border-[#dbfa8e] bg-transparent px-4 text-[15px] text-[#dbfa8e] transition delay-75 hover:bg-[#dbfa8e] hover:text-[#006400]">
										Points: {question.points}
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
											setIsStart(!isStart);
											if (isStart) {
												stopContainer();
											} else {
												startContainer();
											}
										}}
									>
										{isStart ? <span>Stop</span> : <span>Start</span>}
									</button>
								</div>
							</div>

							<div className="my-16 flex items-center justify-center gap-4">
								{hintList.map((hint) => {
									return (
										<button
											className="h-16 w-16 rounded-sm border border-[#dbfa8e] bg-transparent px-4 text-[#dbfa8e] transition delay-75 hover:bg-[#dbfa8e] hover:text-[#006400]"
											key={hint}
											onClick={() => handleHintClick(hint)}
										>
											{hint}
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
