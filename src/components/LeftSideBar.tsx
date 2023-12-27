import { NavLink, useLocation } from "react-router-dom";
import { leftSidebarLinks } from "../constants";

interface Location {
	pathname: string;
}

const isAuthenticated: boolean = false;

const LeftSideBar = () => {
	const location = useLocation() as Location;
	const pathname = location.pathname;

	return (
		<div className="fixed left-0 top-0 hidden h-screen flex-col justify-between overflow-y-auto bg-black p-6 pt-36 max-lg:flex max-lg:w-[200px] max-sm:hidden">
			<div className="flex flex-1 flex-col gap-6">
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
							}  flex justify-start gap-4 rounded-xl bg-transparent p-4`}
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
										? "text-[15px] font-bold leading-[140%]"
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
				<div className="flex flex-col gap-6">
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
				to={`/more`}
				className={` mb-6 mt-6 flex justify-center rounded-xl border p-2 px-3`}
			>
				MORE
			</NavLink>
		</div>
	);
};

export default LeftSideBar;
