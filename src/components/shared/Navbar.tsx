import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { HomeNavbarLinks } from "../../types";
import { homeNavbarLinks } from "../../constants";
import MobileNavbar from "./MobileNavbar";
import { useUserContext } from "../../context/AuthContext";
import { Location } from "../../types";
import logo from "../../assets/images/club-logo.png";

const Navbar = () => {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [isMoreActive, setIsMoreActive] = useState(false);
	const location = useLocation() as Location;
	const pathname = location.pathname;
	const { isAuthenticated } = useUserContext();
	const navigate = useNavigate();

	function handlelogOut() {
		localStorage.removeItem("jwt_token");
		localStorage.clear();
		navigate("/sign-in");
	}

	return (
		<nav className=" shadow-light-300 fixed z-50 flex h-[80px]  w-full items-center justify-between border-b-2 border-[#f8fafc0f] bg-[#0f172abf] p-6 backdrop-blur-lg sm:px-12">
			<div className="flex items-center justify-center gap-4">
				<img src={logo} alt="logo" className="h-[60px] w-[60px]" />
				<span className="font-DM-Mono text-[20px] font-bold text-animation-green max-lg:hidden">
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
											? " rounded-md border border-animation-green px-4 py-2 text-[15px] font-bold leading-[140%] shadow-sm shadow-animation-green"
											: ""
									} flex  justify-center px-4 py-2 font-DM-Mono text-animation-green outline-none`}
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

					{isAuthenticated ? (
						<NavLink to="/sign-in">
							<button
								className=" rounded-md border border-animation-green px-4 py-2 font-DM-Mono text-[15px] font-bold leading-[140%] shadow-sm shadow-animation-green hover:text-animation-green"
								onClick={() => handlelogOut()}
							>
								Log Out
							</button>
						</NavLink>
					) : (
						<>
							<NavLink to="/sign-in">
								<button className=" rounded-md border border-animation-green px-4 py-2 font-DM-Mono text-[15px] font-bold leading-[140%] shadow-sm shadow-animation-green hover:text-animation-green">
									Log In
								</button>
							</NavLink>
							<NavLink to="/sign-up">
								<button className=" rounded-md border border-animation-green  px-4 py-2 font-DM-Mono text-[15px] font-bold text-white shadow-sm shadow-animation-green   hover:text-animation-green">
									Sign Up
								</button>
							</NavLink>
						</>
					)}
				</div>
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
