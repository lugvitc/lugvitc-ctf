import { NavLink, useLocation } from "react-router-dom";
import { leftSidebarLinks } from "../../constants";
import { useUserContext } from "../../context/AuthContext";
import { Location, Props } from "../../types";
import logo from "../../assets/images/club-logo.png";

const MobileNavbar = ({ isOpen, setIsOpen }: Props) => {
	const location = useLocation() as Location;
	const pathname = location.pathname;
	const { isAuthenticated } = useUserContext();

	return (
		<div
			className={` z-sheet fixed left-0 top-0 hidden h-screen w-9/12 flex-col overflow-auto bg-black px-6 shadow-xl transition-transform duration-300 ease-in-out max-sm:flex ${
				isOpen ? "translate-x-0 transform" : "-translate-x-full"
			}`}
		>
			<div className="mt-6 flex items-center justify-start gap-4 px-6">
				<img
					src={logo}
					alt="logo"
					className="h-[52px] w-[52px]"
				/>
				<span className="font-DM-Mono text-white">Linux Club VITC</span>
			</div>
			<div className="mt-24 flex flex-1 flex-col justify-start gap-6  ">
				{leftSidebarLinks.map((link) => {
					const isActive = pathname === link.route;
					return (
						<NavLink
							key={link.label}
							to={link.route}
							className={`${
								isActive
									? "primary-gradient text-light-900 rounded-lg"
									: "text-dark300_light900"
							}  flex w-full justify-start gap-4 rounded-xl bg-transparent p-4`}
							onClick={() => {
								setIsOpen(!isOpen);
							}}
						>
							<img
								src={link.img}
								alt={link.label}
								width={20}
								height={20}
								className={`${isActive ? "" : "invert-colors"}`}
							/>
							<p
								className={`${
									isActive
										? "text-[18px] font-bold leading-[140%]"
										: "text-[18px] font-medium leading-[25.2px]"
								}`}
							>
								{link.label}
							</p>
						</NavLink>
					);
				})}
			</div>

			{/* TODO: ADD REAL AUTH */}
			{isAuthenticated === false && (
				<div className="mb-6 flex flex-col gap-6">
					<NavLink to="/log-in">
						<button className="w-full rounded-xl border px-4 py-2 text-[15px] font-bold leading-[140%] shadow-none hover:border-sky-blue hover:text-sky-blue">
							Log In
						</button>
					</NavLink>
					<NavLink to="/sign-up">
						<button className="w-full rounded-xl border border-sky-blue px-4 py-2 text-[15px] font-bold leading-[140%] text-sky-blue shadow-none hover:border-white hover:text-white">
							Sign Up
						</button>
					</NavLink>
				</div>
			)}
			<NavLink
				to={`/rules`}
				className={` mb-6 flex justify-center rounded-xl border p-2 px-3`}
			>
				RULES
			</NavLink>
		</div>
	);
};

export default MobileNavbar;
