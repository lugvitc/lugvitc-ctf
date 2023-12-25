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
							className={`${isActive
									? "primary-gradient rounded-lg"
									: ""
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
								className={`${isActive
										? "base-bold"
										: "base-semibold "
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
						<button className="w-full rounded-xl border px-4 py-2 base-bold shadow-none hover-login">
							Log In
						</button>
					</NavLink>
					<NavLink to="/sign-up">
						<button className="w-full rounded-xl border hover-signup px-4 py-2 base-bold shadow-none">
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
