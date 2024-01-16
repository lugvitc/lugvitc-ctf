import { NavLink } from "react-router-dom";
import { useUserContext } from "../../context/AuthContext";

const Rules = () => {
	const { isAuthenticated } = useUserContext();
	return (
		<>
			<div className="flex h-screen w-full flex-col items-center justify-center">
				<div className="mx-24 flex flex-row items-center justify-center">
					<div className="flex flex-col justify-start max-xl:justify-center">
						<div className="flex flex-col justify-start">
							<h1 className="font-source-code-pro text-[100px] font-bold leading-[140%] max-xl:text-[80px]">
								Rules
							</h1>
							<span className="font-source-code-pro text-[35px] font-medium max-xl:text-[25px]">
								Just high quality CTFs made with ❤️
							</span>
						</div>
						<div className="mt-14 max-w-[562px] ">
							<span className="font-source-code-pro text-[28px] font-normal max-xl:text-[23px]">
								Lorem ipsum dolor sit amet consectetur, adipisicing elit.
								Eligendi, qui assumenda! Vitae, tenetur molestiae asperiores
								animi similique at ipsum consectetur.
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
								<NavLink to="/play">
									<button className="w-full rounded-xl border border-sky-blue  px-4 py-2 text-[24px] text-sky-blue shadow-none hover:border-white hover:text-white">
										Play
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
					src="src/assets/images/someWhiteObjectImage.png"
					alt="whiteObject"
					className="absolute bottom-0"
				/>
			</div>
		</>
		// <div>
		// 	<div className="flex min-h-screen items-center p-20 font-source-code-pro">
		// 		<section className="ml-14 flex gap-80 ">
		// 			<div className="mg-28 ml-1.5 text-4xl text-white">
		// 				<h1 className="text-8xl font-semibold">Rules</h1>
		// 				<h5 className="text-xl">Just high quality CTFs made with ❤️</h5>
		// 				<p className="mt-7 w-96 break-words text-xl font-normal text-white">
		// 					ABCDEFGHIJKKADSBFOUDHBOUBHFBHBFHHABLBAHLEHAJNZLHBLHFlhbnfNBjnBIWRIUBIRRLNKRNZSBNIZNNZJNBJNBNKDFNKNBZDN
		// 				</p>
		// 				<div className="mt-4 space-x-4">
		// 					<NavLink to="/log-in">
		// 						<button className="hover-login rounded-xl border px-4 py-2 text-[24px] shadow-none hover:transition-all">
		// 							Sign up
		// 						</button>
		// 					</NavLink>
		// 					<span className="font-DM-Mano text-[24px] font-normal italic">
		// 						-or-
		// 					</span>
		// 					<NavLink to="/sign-up">
		// 						<button className="hover-signup rounded-xl border px-4 py-2 text-[24px] shadow-none">
		// 							Log in
		// 						</button>
		// 					</NavLink>
		// 				</div>
		// 			</div>

		// 			<div className="h-96 ">
		// 				<img
		// 					src="/src/assets/images/landingPageTux.png"
		// 					alt="Illustration"
		// 				/>
		// 			</div>
		// 		</section>
		// 	</div>
		// </div>
	);
};
export default Rules;
