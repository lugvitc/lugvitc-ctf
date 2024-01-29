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
			<div className="bg-opacity-55 flex w-full flex-col items-start justify-center overflow-x-hidden bg-landing bg-cover bg-fixed bg-landingPos bg-repeat-x">
				<div className="bg-black bg-opacity-30">
					<Element name="home" className="h-screen w-screen ">
						{
							<div className="pt-30 flex h-screen w-4/5 flex-col items-start justify-center pl-40 ">
								<h1 className="font-source-code-pro text-[90px] font-bold leading-[140%] text-[#9FEF00] max-xl:text-[80px]">
									<Typewriter
										onInit={(typewriter) => {
											typewriter.typeString("PASSWORDCTF").start();
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
						}
					</Element>

					<Element name="rules" className="mb-4 h-auto w-full">
						{isScrolledDown && (
							<div>
								<div className="flex h-auto flex-col justify-start pl-40 pt-60">
									<h1 className="font-source-code-pro text-[100px] font-bold leading-[140%] text-[#9FEF00] max-xl:text-[80px]">
										<Typewriter
											onInit={(typewriter) => {
												typewriter.typeString("Rules").start();
											}}
										/>
									</h1>
									<div className="mt-2 max-w-[900px]  ">
										<span className="animate-fadeIn font-source-code-pro text-[20px] font-normal drop-shadow-black delay-150 max-xl:text-[23px]">
											<strong>Important Points:</strong>
											<br />
											<strong>1. Educational Purpose Only: </strong>All tools,
											techniques, and information are for learning
											cybersecurity, not real-world hacking.
											<br />
											<br />
											<strong>2. Legal Compliance: </strong> Participants are
											reminded to abide by all applicable local, national, and
											international laws. Engaging in any illegal activities is
											strictly prohibited. <br />
											<br />
											<strong>3. Ethical Conduct: </strong> We emphasize the
											importance of ethical behavior in cyberspace. Respect the
											privacy and rights of others, and avoid any actions that
											may cause harm or violate ethical standards.
											<br />
											<br />
											By participating in PASSWORD&apos;24, you acknowledge and
											agree to adhere to these guidelines. The organizers and
											sponsors of this event are not responsible for any misuse
											of the knowledge gained.
											<br />
											Stay Safe Online!
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
					<footer className="mt-auto flex w-full items-center justify-between bg-transparent px-12 py-4 font-source-code-pro text-[#9FEF00] backdrop-blur-sm max-md:flex-col">
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
