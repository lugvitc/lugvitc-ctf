import { NavLink, useLocation } from "react-router-dom";
import { useState } from "react";
import { HomeNavbarLinks } from "../../types";
import { homeNavbarLinks } from "../../constants";
import MobileNavbar from "../MobileNavbar";

interface Location {
	pathname: string;
}
const Navbar = () => {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [isMoreActive, setIsMoreActive] = useState(false);
	const location = useLocation() as Location;
	const pathname = location.pathname;
	const isAuthenticated = false; // TODO: Replace with actual auth state

	return (
		<nav className="shadow-light-300 fixed z-50 flex max-h-[140px] w-full items-center justify-between p-6 dark:shadow-none sm:px-12">
			<div className="flex items-center justify-center gap-4">
				<img
					src="src/assets/images/club-logo.png"
					alt="logo"
					className="h-[52px] w-[52px]"
				/>
				<span className="font-DM-Mono text-white max-lg:hidden">
					Linux Club VITC
				</span>
			</div>
			<div className="flex items-center justify-center gap-6 max-lg:hidden">
				<div className="flex items-center justify-center gap-4">
					<div className="flex items-center justify-center gap-4">
						{homeNavbarLinks.map((item: HomeNavbarLinks) => {
							const isActive = pathname === item.route;
							return (
								<NavLink
									key={item.label}
									to={item.route}
									className={`${
										isActive
											? "primary-gradient rounded-xl text-[15px] font-bold leading-[140%]"
											: ""
									} flex w-[80px] justify-center px-4 py-2 font-DM-Mono outline-none`}
									onClick={() => {
										if (isMoreActive === true) {
											setIsMoreActive(false);
										}
									}}
								>
									{item.label}
								</NavLink>
							);
						})}
					</div>

					{/* TODO: Replace with actual auth state */}

					{!isAuthenticated && (
						<>
							<NavLink to="/log-in">
								<button className="w-full rounded-xl border px-4 py-2 text-[15px] font-bold leading-[140%] shadow-none hover:border-[#78CBFF] hover:text-[#78CBFF]">
									Log In
								</button>
							</NavLink>
							<NavLink to="/sign-up">
								<button className="w-full rounded-xl border border-[#78CBFF] px-4 py-2 text-[15px] font-bold leading-[140%] text-[#78CBFF] shadow-none hover:border-white hover:text-white">
									Sign Up
								</button>
							</NavLink>
						</>
					)}
				</div>
				<NavLink
					to={`/more`}
					className={`${
						isMoreActive ? "bg-[#002133]" : ""
					} rounded-xl border p-2 px-3`}
					onClick={() => {
						setIsMoreActive(!isMoreActive);
					}}
				>
					MORE
				</NavLink>
			</div>
			{isOpen ? (
				<img
					src="src/assets/icons/close.svg"
					alt="extend"
					className="hidden h-[45px] w-[45px] cursor-pointer invert max-sm:flex"
					onClick={() => {
						setIsOpen(!isOpen);
					}}
				/>
			) : (
				<img
					src="src/assets/icons/hamburger.png"
					alt="extend"
					className="hidden h-[45px] w-[45px] cursor-pointer invert max-sm:flex"
					onClick={() => {
						setIsOpen(!isOpen);
					}}
				/>
			)}

			<MobileNavbar isOpen={isOpen} setIsOpen={setIsOpen} />
		</nav>
	);
};

export default Navbar;
