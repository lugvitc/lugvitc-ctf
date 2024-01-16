// import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import Typewriter from "typewriter-effect";
import { Button, Element, animateScroll as scroll } from "react-scroll";
import { useGlitch } from "react-powerglitch";

const LandingPage = () => {
	const glitch = useGlitch({
		shake: {
			velocity: 20,
			amplitudeX: 0.7,
			amplitudeY: 0.3,
		},
	});
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
			<div className="bg-opacity-55 flex w-full flex-col items-start justify-center bg-landing bg-cover bg-fixed bg-landingPos bg-repeat-x">
				<div className="bg-black bg-opacity-30">
					<Element name="home" className="h-screen w-screen ">
						{!isScrolledDown && (
							<div className="pt-30 flex h-screen w-4/5 flex-col items-start justify-center pl-40 ">
								<h1 className="font-source-code-pro text-[90px] font-bold leading-[140%] text-[#9FEF00] max-xl:text-[80px]">
									<Typewriter
										onInit={(typewriter) => {
											typewriter.typeString("PWNC0R3").start();
										}}
									/>
								</h1>
								<span className="animate-fadeIn font-source-code-pro text-[35px] font-medium max-xl:text-[25px]	">
									Just high quality CTFs made with{" "}
									<span ref={glitch.ref}>❤️ </span>
								</span>

								<div className="mt-14 max-w-[562px] ">
									<span className="animate-fadeIn font-source-code-pro text-[28px] font-normal max-xl:text-[23px] ">
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
					</Element>

					<Element name="rules" className="h-screen w-screen">
						{isScrolledDown && (
							<div>
								<div className="flex h-screen flex-col justify-start pl-40 pt-60">
									<h1 className="font-source-code-pro text-[100px] font-bold leading-[140%] text-[#9FEF00] max-xl:text-[80px]">
										<Typewriter
											onInit={(typewriter) => {
												typewriter.typeString("Rules").start();
											}}
										/>
									</h1>
									<div className="mt-2 max-w-[562px] ">
										<span className="animate-fadeIn font-source-code-pro text-[28px] font-normal delay-150 max-xl:text-[23px]">
											Scour the technincal landscape for clues leading you to
											the flag, submit the flag to earn points and dominate the
											leaderboard
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
							</div>
						)}
					</Element>
					<footer className="mt-auto flex w-screen items-center justify-between bg-transparent px-12 py-4 font-source-code-pro text-[#9FEF00] backdrop-blur-sm max-md:flex-col">
						<p>
							Made with love, <span> sweat and tears</span> by THE LINUX CLUB{" "}
						</p>
						<p>Copyright 2024 @ LUGVITC</p>
					</footer>
				</div>
			</div>
		</>
	);
};

export default LandingPage;
