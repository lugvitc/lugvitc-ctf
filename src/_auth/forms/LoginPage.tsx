import { useNavigate, NavLink, Navigate } from "react-router-dom";
import clubLogo from "../../assets/images/club-logo.png";
import axios from "axios";

import { useState } from "react";
import { useUserContext } from "../../context/AuthContext";

interface LoginResponse {
	msg_code: string;
	access_token?: string;
	token_type?: string;
}

const LoginPage = () => {
	// DUMMY AUTHENTICATION
	const { isAuthenticated, setIsAuthenticated } = useUserContext();
	const navigate = useNavigate();
	const [name, setName] = useState("");
	const [password, setPassword] = useState("");
	const [msg, setMsg] = useState({ msg: "", color: "" });
	const [showPopUp, setShowPopUp] = useState(false);
	const [submitted, setSubmitted] = useState(false);

	const msgCode = (status: number, msg_code: string) => {
		if (status >= 200 && status < 400) {
			setMsg({ msg: msg_code, color: "green" });
		} else if (status >= 400 && status < 500) {
			setMsg({ msg: msg_code, color: "red" });
		}
		console.log(msg);
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
		e.preventDefault();
		setSubmitted(true);

		// DUMMY AUTHENTICATION

		// localStorage.setItem("jwt_token", "response.data.access_token");
		// setIsAuthenticated(true);
		// navigate("/leaderboard");

		// AUTHENTICATION

		axios
			.post<LoginResponse>("http://localhost:5000/api/auth/login", {
				name: name,
				password: password,
			})
			.then((response) => {
				if (
					response.data.msg_code === "login_success" &&
					response.data.access_token
				) {
					localStorage.setItem("jwt", response.data.access_token);
					msgCode(response.status, response.data.msg_code);
					setIsAuthenticated(true);

					setTimeout(() => {
						navigate("/play");
					}, 2000);
				} else if (
					response.data.msg_code === "team_not_found" ||
					response.data.msg_code === "wrong_password"
				) {
					msgCode(404, response.data.msg_code);
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

	const handlePopup = () => {
		setShowPopUp(false);
	};
	return (
		<>
			{isAuthenticated && <Navigate to="/"></Navigate>}
			<div className="flex h-screen flex-col items-center justify-center gap-2 overflow-auto p-20 font-source-code-pro">
				<div className="box flex flex-col justify-center rounded-lg bg-black p-6 md:p-10">
					<div className="flex w-full basis-1/4 flex-col gap-4 md:w-96 md:gap-6">
						<div className="flex justify-center">
							<div
								className={`flex h-12 w-48 items-center justify-center text-lg font-bold md:h-16 md:w-60 md:text-xl`}
							>
								<img
									src={clubLogo}
									alt=""
									className="h-full w-full object-contain"
								/>
								<span>PasswordCTF</span>
							</div>
						</div>
						<div className="text-center text-base font-semibold md:text-lg">
							Welcome back
						</div>
						<div className="text-center text-sm  text-gray36 ">
							To solve ctf, please enter your details
						</div>
					</div>
					<div className="basis-3/4 md:w-96">
						<form
							className="flex flex-col items-center justify-center gap-2 p-6 text-base md:gap-4 md:p-10 md:text-lg"
							onSubmit={(e) => {
								e.preventDefault();
								handleSubmit(e);
							}}
						>
							<label className="w-full">
								Team Name
								<input
									className="my-2 block w-full rounded-lg bg-dark-grayish-blue md:my-4"
									type="text"
									value={name}
									onChange={(e) => setName(e.target.value)}
									required
								/>
							</label>
							<label className="w-full">
								Password
								<input
									className="my-2 block w-full rounded-lg bg-dark-grayish-blue md:my-4"
									type="password"
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									required
								/>
							</label>
							<div className="flex h-12 w-full justify-center">
								{submitted ? (
									<div className="flex flex-row gap-2">
										<div className="h-4 w-4 animate-bounce rounded-full bg-blue-700 [animation-delay:.7s]"></div>
										<div className="h-4 w-4 animate-bounce rounded-full bg-blue-700 [animation-delay:.3s]"></div>
										<div className="h-4 w-4 animate-bounce rounded-full bg-blue-700 [animation-delay:.7s]"></div>
									</div>
								) : (
									<button
										type="submit"
										className="align-center w-full rounded-xl bg-midnight-blue p-1 font-normal md:p-2"
									>
										Sign In
									</button>
								)}
							</div>
						</form>
					</div>
				</div>
				<div className="text-xs md:text-lg">
					New User?
					<NavLink to="/sign-up" className="text-blue-500">
						Sign Up
					</NavLink>
				</div>
				<div
					className={`absolute top-0 z-10 flex h-32 w-52 origin-top flex-col items-center justify-center gap-1 rounded-3xl bg-dark-grayish-blue p-2 font-source-code-pro duration-200 md:w-96 md:p-4 ${
						!showPopUp
							? "scale-y-0"
							: msg["color"] === "green"
							? "scale-y-150 border-8 border-green-600 text-green-600"
							: "scale-y-150 border-8 border-red-600 text-red-600"
					}`}
				>
					<span className="flex basis-3/4 items-center text-base font-semibold md:text-xl">
						{msg["msg"]}
					</span>
					<button
						onClick={handlePopup}
						className="duration-400 relative flex items-center self-end overflow-hidden rounded-[50px] bg-black px-8 py-1 text-xs font-bold uppercase text-white shadow-md transition-all ease-in-out before:absolute before:-left-full before:top-0 before:z-[-1] before:h-full before:w-full before:rounded-[50px] before:bg-gradient-to-r before:from-blue-500 before:to-blue-300 before:transition-all before:duration-500 before:ease-in-out hover:scale-105 hover:text-white hover:shadow-lg hover:before:left-0 active:scale-90 md:text-sm"
					>
						CLOSE
					</button>
				</div>
			</div>
		</>
	);
};

export default LoginPage;
