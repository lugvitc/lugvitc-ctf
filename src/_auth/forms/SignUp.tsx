import { useNavigate, NavLink, Navigate } from "react-router-dom";
import eventLogo from "../../assets/images/passwordctf-logo.png";

import axios, { AxiosError, AxiosResponse } from "axios";
import { useState } from "react";
import { useUserContext } from "../../context/AuthContext";
import { TOAST_MESSAGES, URL_ORIGIN } from "../../constants";
import Background from "../../components/shared/Background";
import toast, { Toaster } from "react-hot-toast";
import { SignupResponse } from "../../types";

import "./SignUp.css";

const SignUp = () => {
	const [selected, setSelected] = useState<number>(0);
	const { isAuthenticated } = useUserContext();
	const navigate = useNavigate();
	const [name, setName] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [members, setMembers] = useState<string[]>(["", "", ""]);
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

		axios
			.post<SignupResponse>(`${URL_ORIGIN}/auth/signup`, {
				name: name,
				password: password,
				tags: members.filter((val) => val),
			})
			.then((response: AxiosResponse<SignupResponse>) => {
				if (response.data.msg_code === 17) {
					toast(TOAST_MESSAGES.TEAM_EXISTS);
				} else if (response.data.msg_code === 0) {
					toast(TOAST_MESSAGES.DB_ERROR);
				} else if (response.data.msg_code === 13) {
					toast(TOAST_MESSAGES.SIGNUP_SUCCESS);
					setTimeout(() => {
						navigate("/sign-in");
					}, 2000);
				} else if (response.status === 404) {
					toast(TOAST_MESSAGES.USERS_NOT_FOUND);
				} else if (response.status === 401) {
					toast(TOAST_MESSAGES.USER_ALREADY_IN_TEAM);
				}
			})
			.catch((error: AxiosError) => {
				if (error.response) {
					if (error.response.status === 404) {
						toast(TOAST_MESSAGES.USERS_NOT_FOUND);
					} else if (error.response.status === 401) {
						toast(TOAST_MESSAGES.USER_ALREADY_IN_TEAM);
					} else {
						toast("Unknown Error");
					}
				} else if (error.request) {
					toast("No response");
				} else {
					toast(
						"Something happened in setting up the request that triggered an Error",
					);
				}
				console.error(error);
			})
			.finally(() => {
				setName("");
				setPassword("");
				setMembers(["", "", ""]);
			});
	};

	const handleInputChange = (index: number, value: string) => {
		const updatedTeamMembers: string[] = [...members];
		updatedTeamMembers[index] = value;
		setMembers(updatedTeamMembers);
	};

	// const handlePopup = () => {
	// 	setShowPopUp(true);
	// 	setTimeout(() => {
	// 		setShowPopUp(false);
	// 		setSubmitted(false);
	// 	}, 1800);
	// };

	console.log(submitted);
	return (
		<>
			{isAuthenticated && <Navigate to="/sign-in"></Navigate>}

			<Background />
			<div className="left-1/8 absolute top-[100px] z-10 flex h-auto w-[750px] flex-col items-center justify-center gap-2 overflow-auto p-11 font-source-code-pro">
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
							Hackers Required: <br />
							Join the Space CTF
						</div>
						<div className="mt-11 text-center  text-sm text-gray-300">
							Breach the Firewall, Enter the Nebula: Sign Up for the Cosmic
							Challenge!
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
								Team Name <span className="text-red-700">*</span>
								<input
									className="my-2 block h-[46px] w-80 rounded-lg bg-dark-grayish-blue px-4 py-2 md:my-4"
									type="text"
									value={name}
									onChange={(e) => setName(e.target.value)}
									required
								/>
							</label>
							<label className="w-full">
								Team Size:
								<div className="container flex gap-4">
									<div className="radio-wrapper">
										<input
											className="input"
											name="btn"
											id="value-1"
											type="radio"
											onClick={() => setSelected(1)}
										/>
										<div className="btn flex items-center justify-center text-xl text-fluorescent-green drop-shadow-3xl">
											<span>1</span>
											<span className="btn__glitch">1</span>
											<label className="number left-[60px] top-0 px-1 text-xs">
												r1
											</label>
										</div>
									</div>
									<div className="radio-wrapper">
										<input
											className="input"
											name="btn"
											id="value-2"
											// checked={true}
											type="radio"
											onClick={() => setSelected(2)}
										/>
										<div className="btn flex items-center justify-center text-xl text-fluorescent-green drop-shadow-3xl">
											2<span className="btn__glitch">2</span>
											<label className="number left-[60px] top-0 px-1 text-xs">
												r2
											</label>
										</div>
									</div>
									<div className="radio-wrapper">
										<input
											className="input"
											name="btn"
											id="value-3"
											type="radio"
											onClick={() => setSelected(3)}
										/>
										<div className="btn flex items-center justify-center text-xl text-fluorescent-green drop-shadow-3xl">
											3<span className="btn__glitch">3</span>
											<label className="number left-[60px] top-0 px-1 text-xs">
												r3
											</label>
										</div>
									</div>
								</div>
							</label>
							{Array.from({ length: selected }).map((_, i) => (
								<label key={i} className="w-full">
									Member {i + 1}: <span className="text-red-700">*</span>
									<input
										className="my-1 block h-[46px]  w-80 rounded-lg bg-dark-grayish-blue px-4 py-2 md:my-2"
										type="text"
										value={members[i]}
										onChange={(e) => handleInputChange(i, e.target.value)}
										required
									/>
								</label>
							))}

							{/* <label className="w-full">
								Member 1
								<input
									className="my-1 block h-[46px]  w-80 rounded-lg bg-dark-grayish-blue px-4 py-2 md:my-2"
									type="text"
									value={members[0]}
									onChange={(e) => handleInputChange(0, e.target.value)}
									required
								/>
							</label>
							<label className="w-full">
								Member 2
								<input
									className="my-1 block h-[46px]  w-80 rounded-lg bg-dark-grayish-blue px-4 py-2 md:my-2"
									type="text"
									value={members[1]}
									onChange={(e) => handleInputChange(1, e.target.value)}
								/>
							</label>
							<label className="w-full">
								Member 3
								<input
									className="my-1 block h-[46px]  w-80 rounded-lg bg-dark-grayish-blue px-4 py-2 md:my-2"
									type="text"
									value={members[2]}
									onChange={(e) => handleInputChange(2, e.target.value)}
								/>
							</label> */}
							<label className="w-full">
								Password <span className="text-red-700">*</span>
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
										<div className="h-4 w-4 animate-bounce rounded-full bg-animation-green [animation-delay:.7s]"></div>
										<div className="h-4 w-4 animate-bounce rounded-full bg-animation-green [animation-delay:.3s]"></div>
										<div className="h-4 w-4 animate-bounce rounded-full bg-animation-green [animation-delay:.7s]"></div>
									</div>
								) : (
									<button
										type="submit"
										className=" h-[47px] w-72 rounded-xl border border-animation-green p-1 font-normal hover:text-animation-green md:p-2"
									>
										Sign Up
									</button>
								)}
							</div>
						</form>
					</div>
				</div>
				<div className="text-xs font-bold md:text-lg">
					Already have an account?
					<NavLink to="/sign-in" className="font-bold text-animation-green">
						Sign In
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

export default SignUp;
