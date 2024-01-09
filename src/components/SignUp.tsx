import { NavLink } from "react-router-dom";
import { Navigate } from "react-router-dom";
import clubLogo from "../assets/images/club-logo.png";

import { useState } from "react";

const SignUp = () => {
	// DUMMY AUTHENTICATION
	const isAuthenticated = false;

	const [name, setName] = useState("");
	const [password, setPassword] = useState("");
	const [members, setMembers] = useState<string[]>([]);

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		console.log("Name:", name);
		console.log("Pass:", password);
		console.log(members);
		setName("");
		setPassword("");
		setMembers(() => {
			for (let i = 0; i < members.length; i++) {
				members.pop();
			}
			return members;
		});
		console.log(members);
	};

	const handleInputChange = (index: number, value: string) => {
		const updatedTeamMembers: string[] = [...members];
		updatedTeamMembers[index] = value;
		setMembers(updatedTeamMembers);
	};

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
							<button
								type="submit"
								className="align-center w-full rounded-xl bg-midnight-blue p-1 font-normal md:p-2"
							>
								Sign Up
							</button>
						</form>
					</div>
				</div>
				<div className="text-xs md:text-lg">
					Already Logged In? Click{" "}
					<NavLink to="/log-in" className="text-blue-500">
						Here
					</NavLink>
				</div>
			</div>
		</>
	);
};

export default SignUp;
