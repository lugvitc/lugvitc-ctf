import { NavLink } from "react-router-dom";

const Rules = () => {
	return (
		<div>
			<div className="flex min-h-screen items-center p-20 font-source-code-pro">
				<section className="ml-14 flex gap-80 ">
					<div className="mg-28 ml-1.5 text-4xl text-white">
						<h1 className="text-8xl font-semibold">Rules</h1>
						<h5 className="text-xl">Just high quality CTFs made with ❤️</h5>
						<p className="mt-7 w-96 break-words text-xl font-normal text-white">
							ABCDEFGHIJKKADSBFOUDHBOUBHFBHBFHHABLBAHLEHAJNZLHBLHFlhbnfNBjnBIWRIUBIRRLNKRNZSBNIZNNZJNBJNBNKDFNKNBZDN
						</p>
						<div className="mt-4 space-x-4">
							<NavLink to="/log-in">
								<button className="hover-login rounded-xl border px-4 py-2 text-[24px] shadow-none hover:transition-all">
									Sign up
								</button>
							</NavLink>
							<span className="font-DM-Mano text-[24px] font-normal italic">
								-or-
							</span>
							<NavLink to="/sign-up">
								<button className="hover-signup rounded-xl border px-4 py-2 text-[24px] shadow-none">
									Log in
								</button>
							</NavLink>
						</div>
					</div>

					<div className="h-96 ">
						<img
							src="/src/assets/images/landingPageTux.png"
							alt="Illustration"
						/>
					</div>
				</section>
			</div>
		</div>
	);
};
export default Rules;
