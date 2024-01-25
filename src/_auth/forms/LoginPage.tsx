import { useNavigate, NavLink, Navigate } from "react-router-dom";
import eventLogo from "../../assets/images/passwordctf-logo.png";
import axios from "axios";

import { useState } from "react";
import { useUserContext } from "../../context/AuthContext";
import { TOAST_MESSAGES, URL_ORIGIN } from "../../constants";
import Background from "../../components/shared/Background";
import toast, { Toaster } from "react-hot-toast";
import { LoginResponse } from "../../types";

const LoginPage = () => {
	// DUMMY AUTHENTICATION
	const { isAuthenticated, setIsAuthenticated } = useUserContext();
	const navigate = useNavigate();
	const [name, setName] = useState("");
	const [password, setPassword] = useState("");
	// const [msg, setMsg] = useState({ msg: "", color: "" });
	// const [showPopUp, setShowPopUp] = useState(false);
	const [submitted, setSubmitted] = useState(false);

	// const msgCode = (status: number, msg_code: string) => {
	// 	if (status >= 200 && status < 400) {
	// 		setMsg({ msg: msg_code, color: "green" });
	// 		handlePopup();
	// 		setShowPopUp(true);
	// 	} else if (status >= 400 && status < 500) {
	// 		setMsg({ msg: msg_code, color: "red" });
	// 		handlePopup();
	// 		setShowPopUp(true);
	// 	}
	// 	console.log(msg);
	// };

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
		e.preventDefault();
		setSubmitted(true);

		// DUMMY AUTHENTICATION

		// localStorage.setItem("jwt_token", "response.data.access_token");
		// setIsAuthenticated(true);
		// navigate("/play");

		// AUTHENTICATION

		axios
			.post<LoginResponse>(`${URL_ORIGIN}/auth/login`, {
				name: name,
				password: password,
			})
			.then((response) => {
				if (response.data.msg_code === 15 && response.data.access_token) {
					localStorage.setItem("jwt_token", response.data.access_token);
					toast(TOAST_MESSAGES.LOGIN_SUCCESS);
					setIsAuthenticated(true);

					setTimeout(() => {
						navigate("/play");
					}, 2000);
				} else if (response.data.msg_code === 10) {
					toast(TOAST_MESSAGES.TEAM_NOT_FOUND);
				} else if (response.data.msg_code === 14) {
					toast(TOAST_MESSAGES.WRONG_PASSWORD);
				}
			})
			.catch((error) => {
				console.log(error);
			})
			.finally(() => {
				setName("");
				setPassword("");
			});
	};

	// const handlePopup = () => {
	// 	setShowPopUp(true);
	// 	setTimeout(() => {
	// 		setShowPopUp(false);
	// 		setSubmitted(false);
	// 	}, 1800);
	// };

	return (
		<>
			{isAuthenticated && <Navigate to="/"></Navigate>}
			<Background />
			<div className="left-1/8 absolute top-[69px] z-10 flex h-[900px] w-[750px] flex-col items-center justify-center gap-2 overflow-auto p-20 font-source-code-pro">
				<div className=" flex h-full w-full flex-col items-center justify-center rounded-lg border border-animation-green bg-black p-6 shadow-md shadow-animation-green md:p-10">
					<div className="flex w-full basis-1/4 flex-col items-center justify-center gap-4 md:w-96 md:gap-6">
						<div className="flex justify-center">
							<div
								className={`flex h-12 w-48 items-center justify-center gap-4 text-lg font-bold md:h-16 md:w-60 md:text-xl`}
							>
								<h2
									className="hero glitch layers font-source-code-pro"
									data-text="Linux Club"
								>
									<span className=" font-source-code-pro">PasswordCTF</span>
								</h2>
								<img
									src={eventLogo}
									alt="event-logo"
									className="h-16 w-16 object-contain"
								/>
							</div>
						</div>
						<div className="text-center text-[25px] font-bold  text-animation-green">
							Welcome Hacker
						</div>
						<div className="mt-11 text-center  text-sm text-gray-300">
							Engage the warp drive and set course for the flag.
						</div>
					</div>
					<div className="w-96 basis-3/4">
						<form
							className="flex w-full flex-col items-center justify-center gap-2 p-6 text-base md:gap-4 md:p-10 md:text-lg"
							onSubmit={(e) => {
								e.preventDefault();
								handleSubmit(e);
							}}
						>
							<label className="w-full">
								Team Name
								<input
									className="my-2 block h-[46px] w-80 rounded-lg bg-dark-grayish-blue px-4 py-2 md:my-4"
									type="text"
									value={name}
									onChange={(e) => setName(e.target.value)}
									required
								/>
							</label>
							<label className="w-full">
								Password
								<input
									className="my-2 block h-[46px]  w-80 rounded-lg bg-dark-grayish-blue px-4 py-2 md:my-4"
									type="password"
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									required
								/>
							</label>
							<div className="flex h-12 w-96 items-center justify-center">
								{submitted ? (
									<div className="flex flex-row gap-2">
										<div className="h-4 w-4 animate-bounce rounded-full bg-animation-green [animation-delay:.3s]"></div>
										<div className="h-4 w-4 animate-bounce rounded-full bg-animation-green [animation-delay:.7s]"></div>
										<div className="h-4 w-4 animate-bounce rounded-full bg-animation-green [animation-delay:.7s]"></div>
									</div>
								) : (
									<button
										type="submit"
										className=" h-[47px] w-72 rounded-xl border border-animation-green p-1 font-normal hover:text-animation-green md:p-2"
									>
										Sign In
									</button>
								)}
							</div>
						</form>
					</div>
				</div>
				<div className="text-xs font-bold md:text-lg">
					New User?{" "}
					<NavLink to="/sign-up" className="font-bold text-animation-green ">
						Sign Up
					</NavLink>
					<Toaster position="bottom-right" />
				</div>

				{/* <div
					className={`absolute top-0 z-10 flex h-16 w-[30rem] border-spacing-2 origin-top flex-col items-center justify-center gap-1 rounded-3xl  bg-dark-grayish-blue p-2 font-source-code-pro tracking-widest duration-200  md:p-4 ${!showPopUp
						? "scale-y-0"
						: msg["color"] === "green"
							? "scale-y-150 border-b-2 border-l-2 border-r-2 border-green-600 text-green-600"
							: "scale-y-150 border-b-2 border-l-2 border-r-2 border-red-600 text-red-600"
						}`}
				>
					<span className="flex basis-3/4 items-center text-base  font-semibold md:text-xl">
						{msg["msg"]}
					</span>
				</div> */}
			</div>
		</>
	);
};

export default LoginPage;
