import axios, { AxiosResponse } from "axios";
import "./color.css";
import Typewriter from "typewriter-effect";
import { URL_ORIGIN } from "../../constants";
import toast, { Toaster } from "react-hot-toast";
import { TOAST_MESSAGES } from "../../constants";
import { FlagResponse, Round2Modal } from "../../types";
import React, { useState } from "react";

export const Round2ChallengeModal = ({
	container,
	isClicked,
	closeModal,
}: Round2Modal) => {
	const [flag, setFlag] = useState<string>("");

	const handleFlagSubmit = (e: React.MouseEvent) => {
		const jwt = localStorage.getItem("jwt_token");
		axios
			.post(
				`${URL_ORIGIN}/round2/${container.id}/flag`,
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
						// handleSolved();
					}, 1500);
				} else {
					toast("Incorrect Flag");
				}
			})
			.catch((error) => {
				if (error.response.data.msg_code === 2) {
					toast(`${TOAST_MESSAGES.CTF_NOT_FOUND}`);
				} else if (error.response.data.msg_code === 12) {
					toast(`${TOAST_MESSAGES.CTF_SOLVED}`);
					setTimeout(() => {
						closeModal(e);
						// handleSolved();
					}, 1500);
				} else {
					toast("Unknown Error occured, no internet maybe?");
				}
			});
	};

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
											strings: [container.problem.name],
											// autoStart: true,
											loop: false,
											cursor: "",
											delay: 25,
										}}
										onInit={(typewriter) => {
											typewriter.typeString(container.problem.name).start();
										}}
									/>

									<div className="flex h-[50px] w-[10rem] items-center justify-center rounded-sm border border-[#dbfa8e] bg-transparent px-4 text-[15px] text-[#dbfa8e] transition delay-75 hover:bg-[#dbfa8e] hover:text-[#006400]">
										Points: {container.problem.points}
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
												.typeString(`Author: ${container.problem.author}`)
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
												.typeString(
													`Description: ${container.problem.description}`,
												)
												.start();
										}}
									/>
								</div>
								{/* -------------------PORTS--------------------------------- */}
								{container.ports && container.ports.length > 0 ? (
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
													.typeString(`Port: ${container.ports?.join(",")}`)
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
								</div>
							</div>
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
