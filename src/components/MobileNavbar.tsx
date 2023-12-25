import { NavLink, useLocation } from "react-router-dom";
import { leftSidebarLinks } from "../constants";

interface Location {
	pathname: string;
}

const isAuthenticated: boolean = false;

interface Props {
	isOpen: boolean;
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const MobileNavbar = ({ isOpen, setIsOpen }: Props) => {
	const location = useLocation() as Location;
	const pathname = location.pathname;

	return (
		<div
			className={` z-sheet fixed left-0 top-0 hidden h-screen w-9/12 flex-col overflow-auto bg-black px-6 shadow-xl transition-transform duration-300 ease-in-out max-sm:flex ${isOpen ? "translate-x-0 transform" : "-translate-x-full"
				}`}
		>
			<div className="mt-6 flex items-center justify-start gap-4 px-6">
				<img
					src="src/assets/images/club-logo.png"
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
							className={`${isActive
								? "primary-gradient rounded-lg"
								: ""
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
								className={`${isActive
									? "paragraph-bold"
									: "base-semibold"
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
						<button className="w-full rounded-xl border px-4 py-2 base-bold shadow-none hover-login">
							Log In
						</button>
					</NavLink>
					<NavLink to="/sign-up">
						<button className="w-full rounded-xl border px-4 py-2 base-bold shadow-none hover-signup">
							Sign Up
						</button>
					</NavLink>
				</div>
			)}
			<NavLink
				to={`/more`}
				className={` mb-6 flex justify-center rounded-xl border p-2 px-3`}
			>
				MORE
			</NavLink>
		</div>
	);
};

export default MobileNavbar;
