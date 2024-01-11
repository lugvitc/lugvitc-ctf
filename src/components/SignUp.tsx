import { NavLink } from "react-router-dom";
import { Navigate } from "react-router-dom";
import clubLogo from "../assets/images/club-logo.png";
// import axios from "axios";

import { useState } from "react";

const SignUp = () => {
	// DUMMY AUTHENTICATION
	const isAuthenticated = false;

	const [name, setName] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [members, setMembers] = useState<string[]>(["", "", ""]);
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

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setSubmitted(true);
		// await axios.post("url/signup", {
		// 	'name': name,
		// 	'password': password,
		// 	'tags' : members
		// }).then((res)=>{
		// 	msgCode(res.status, res.data.msg_code)
		// })
		setTimeout(() => {
			console.log("hi");
			setShowPopUp(true);
			setSubmitted(false);
		}, 1000);
		msgCode(400, "Team Created");
		setName("");
		setPassword("");
		setMembers(() => {
			return ["", "", ""];
		});
	};

	const handleInputChange = (index: number, value: string) => {
		const updatedTeamMembers: string[] = [...members];
		updatedTeamMembers[index] = value;
		setMembers(updatedTeamMembers);
	};

	const handlePopup = () => {
		setShowPopUp(false);
	};

	console.log(submitted);
	return (
		<>
			{isAuthenticated && <Navigate to="/sign-in"></Navigate>}
			<div className="flex  flex-col items-center justify-center gap-2 p-20 font-source-code-pro">
				<div className="box flex flex-col justify-center rounded-lg bg-black p-6 md:p-10">
					<div className="flex w-full basis-1/4 flex-col gap-4 md:w-96 md:gap-6">
						<div className="flex justify-center ">
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
							Create a new account
						</div>
						<div className="text-center text-sm  text-gray36 ">
							To solve ctf, please enter your details
						</div>
					</div>
					<div className="basis-3/4 md:w-96">
						<form
							id="sign-up-form"
							className="flex flex-col items-center justify-center gap-2 p-6 text-base md:gap-4 md:p-10 md:text-lg"
							onSubmit={handleSubmit}
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
							<label className="w-full">
								Member 1
								<input
									className="my-1 block w-full rounded-lg bg-dark-grayish-blue md:my-2"
									type="text"
									value={members[0]}
									onChange={(e) => handleInputChange(0, e.target.value)}
									required
								/>
							</label>
							<label className="w-full">
								Member 2
								<input
									className="my-2 block w-full rounded-lg bg-dark-grayish-blue md:my-4"
									type="text"
									value={members[1]}
									onChange={(e) => handleInputChange(1, e.target.value)}
								/>
							</label>
							<label className="w-full">
								Member 3
								<input
									className="my-2 block w-full rounded-lg bg-dark-grayish-blue md:my-4"
									type="text"
									value={members[2]}
									onChange={(e) => handleInputChange(2, e.target.value)}
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
					Already Logged In?{" "}
					<NavLink to="/log-in" className="text-blue-500">
						Log In
					</NavLink>
				</div>
				<div
					className={`absolute top-0 z-10 flex h-32 w-52 origin-top flex-col items-center justify-center gap-1 rounded-3xl bg-dark-grayish-blue p-2 font-source-code-pro duration-200 md:w-96 md:p-2 ${
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

export default SignUp;
