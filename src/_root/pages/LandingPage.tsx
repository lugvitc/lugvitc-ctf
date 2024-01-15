import { NavLink } from "react-router-dom";
import whiteObject from "../../assets/images/someWhiteObjectImage.png";
import { useUserContext } from "../../context/AuthContext";

const LandingPage = () => {
	const { isAuthenticated } = useUserContext();
	return (
		<>
			<div className="flex h-screen w-full flex-col items-center justify-center">
				<div className="mx-24 flex flex-row items-center justify-center">
					<div className="flex flex-col justify-start max-xl:justify-center">
						<div className="flex flex-col justify-start">
							<h1 className="font-source-code-pro text-[100px] font-bold leading-[140%] max-xl:text-[80px]">
								PWNC0R3
							</h1>
							<span className="font-source-code-pro text-[35px] font-medium max-xl:text-[25px]">
								Just high quality CTFs made with ❤️
							</span>
						</div>
						<div className="mt-14 max-w-[562px] ">
							<span className="font-source-code-pro text-[28px] font-normal max-xl:text-[23px]">
								Solve brain wracking challenges as a team or as a lone wolf and
								dominate the leaderboard to win.
							</span>
						</div>
						<div className="mt-8 flex gap-8 pt-8">
							{/* TODO: replace with actual auth */}

							{!isAuthenticated ? (
								<>
									<NavLink to="/log-in">
										<button className="w-full rounded-xl border px-4 py-2 text-[24px] shadow-none hover:border-sky-blue hover:text-sky-blue hover:transition-all">
											Log In
										</button>
									</NavLink>
									<span className="font-DM-Mano text-[24px] font-normal italic">
										-or-
									</span>
									<NavLink to="/sign-up">
										<button className="w-full rounded-xl border border-sky-blue  px-4 py-2 text-[24px] text-sky-blue shadow-none hover:border-white hover:text-white">
											Sign Up
										</button>
									</NavLink>
								</>
							) : (
								<NavLink to="/rules">
									<button className="w-full rounded-xl border border-sky-blue  px-4 py-2 text-[24px] text-sky-blue shadow-none hover:border-white hover:text-white">
										Rules
									</button>
								</NavLink>
							)}
						</div>
					</div>
					<div className="mt-24 max-lg:hidden">
						<img src="src/assets/images/landingPageTux.png" alt="Tux" />
					</div>
				</div>
				<img
					src={whiteObject}
					alt="whiteObject"
					className="absolute bottom-0"
				/>
			</div>
		</>
	);
};

export default LandingPage;
