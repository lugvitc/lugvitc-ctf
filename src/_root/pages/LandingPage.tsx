// import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import Typewriter from "typewriter-effect";
import { Button, Element, animateScroll as scroll } from "react-scroll";

const LandingPage = () => {
	const scrollToTop = () => {
		scroll.scrollToTop();
	};

	const [isScrolledDown, setScrolledDown] = useState<boolean>(false);

	useEffect(() => {
		const handleScroll = () => {
			const isScrolledDown = window.scrollY > 0;
			setScrolledDown(isScrolledDown);
		};
		window.addEventListener("scroll", handleScroll);
		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	return (
		<>
			<div className="flex w-full flex-col items-start justify-center">
				<Element
					name="home"
					className="h-screen w-screen bg-opacity-55 bg-landing bg-cover bg-bottom-4 bg-repeat-x "
				>
					<div className="bg-black bg-opacity-30">
						{!isScrolledDown && (
							<div className="pt-30 flex h-screen w-4/5 flex-col items-start justify-center pl-40 ">
								<h1 className="font-source-code-pro text-[90px] font-bold leading-[140%] max-xl:text-[80px]">
									<Typewriter
										onInit={(typewriter) => {
											typewriter.typeString("PWNC0R3").start();
										}}
									/>
								</h1>
								<span className="animate-fadeIn font-source-code-pro text-[35px] font-medium max-xl:text-[25px]	">
									Just high quality CTFs made with ❤️
								</span>

								<div className="mt-14 max-w-[562px] ">
									<span className="animate-fadeIn font-source-code-pro text-[28px] font-normal max-xl:text-[23px]">
										Solve brain wracking challenges as a team or as a lone wolf
										and dominate the leaderboard to win.
									</span>
								</div>

								<Button
									activeClass="active"
									to="rules"
									spy={true}
									smooth={true}
									offset={500}
									duration={1500}
									className="mr-auto mt-6 rounded-sm border border-gray-200 px-4 py-2"
								>
									Rules
								</Button>
							</div>
						)}
					</div>
				</Element>

				<Element
					name="rules"
					className="h-screen w-screen bg-black bg-opacity-30"
				>
					{isScrolledDown && (
						<div>
							<div className="flex h-screen flex-col justify-start pl-40 pt-40">
								<h1 className="font-source-code-pro text-[100px] font-bold leading-[140%] max-xl:text-[80px]">
									<Typewriter
										onInit={(typewriter) => {
											typewriter.typeString("Rules").start();
										}}
									/>
								</h1>
								<span className="animate-fadeIn font-source-code-pro text-[35px] font-medium delay-150 max-xl:text-[25px]	">
									Just high quality CTFs made with ❤️
								</span>

								<div className="mt-14 max-w-[562px] ">
									<span className="animate-fadeIn font-source-code-pro text-[28px] font-normal delay-150 max-xl:text-[23px]">
										Lorem ipsum dolor sit amet consectetur, adipisicing elit.
										Eligendi, qui assumenda! Vitae, tenetur molestiae asperiores
										animi similique at ipsum consectetur.
									</span>
								</div>
								<button
									className="mr-auto mt-6 rounded-sm border border-gray-200 px-4 py-2"
									onClick={() => {
										scrollToTop();
									}}
								>
									Home
								</button>
							</div>
							<footer className="mt-auto flex w-screen items-center justify-between bg-black bg-opacity-50 px-5 py-4 font-source-code-pro">
								<p>Made with love, sweat and tears by THE LINUX CLUB </p>
								<p>Copyright @ LUGVITC</p>
							</footer>
						</div>
					)}
				</Element>
			</div>
		</>
	);
};

export default LandingPage;
