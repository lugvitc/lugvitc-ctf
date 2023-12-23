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
        <nav className="max-h-[140px] sticky flex justify-between items-center z-50 w-full p-6 shadow-light-300 dark:shadow-none sm:px-12">
            <div className="flex gap-4 items-center justify-center">
                <img
                    src="src/assets/images/club-logo.png"
                    alt="logo"
                    className="w-[52px] h-[52px]"
                />
                <span className="text-white font-DM-Mono max-lg:hidden">Linux Club VITC</span>
            </div>
            <div className="flex gap-6 items-center justify-center max-lg:hidden">
                <div className="flex gap-4 items-center justify-center">


                    <div className="flex gap-4 items-center justify-center">
                        {homeNavbarLinks.map((item: HomeNavbarLinks) => {

                            const isActive = pathname === item.route;
                            return (
                                <NavLink
                                    key={item.label}
                                    to={item.route}
                                    className={`${isActive ? 'rounded-xl primary-gradient text-[15px] font-bold leading-[140%]' : ''} font-DM-Mono px-4 py-2 w-[80px] outline-none flex justify-center`}
                                    onClick={() => {
                                        if (isMoreActive === true) {
                                            setIsMoreActive(false);
                                        }
                                    }}
                                >
                                    {item.label}
                                </NavLink>
                            )
                        })}
                    </div>

                    {/* TODO: Replace with actual auth state */}

                    {!isAuthenticated && (
                        <>
                            <NavLink to="/log-in">
                                <button className='text-[15px] font-bold leading-[140%] border rounded-xl w-full px-4 py-2 shadow-none'>
                                    <span className='text-white'>Log In</span>
                                </button>
                            </NavLink>
                            <NavLink to="/sign-in">
                                <button className='text-[15px] font-bold leading-[140%] border w-full rounded-xl px-4 py-2 shadow-none'>
                                    <span className='text-white'>Sign In</span>
                                </button>
                            </NavLink>
                        </>
                    )}

                </div>
                <NavLink
                    to={`/more`}
                    className={`${isMoreActive ? 'bg-[#002133]' : ''} border p-2 px-3 rounded-xl`}
                    onClick={() => {
                        setIsMoreActive(!isMoreActive);
                    }}
                >
                    MORE
                </NavLink>
            </div>
            {
                isOpen ? (
                    <img
                        src="src/assets/icons/close.svg"
                        alt="extend"
                        className="w-[45px] h-[45px] hidden max-sm:flex cursor-pointer invert"
                        onClick={() => {
                            setIsOpen(!isOpen);
                        }}
                    />
                ) : (
                    <img
                        src="src/assets/icons/hamburger.png"
                        alt="extend"
                        className="w-[45px] h-[45px] hidden max-sm:flex cursor-pointer invert"
                        onClick={() => {
                            setIsOpen(!isOpen);
                        }}
                    />
                )
            }

            <MobileNavbar
                isOpen={isOpen}
                setIsOpen={setIsOpen}
            />
        </nav>
    )
}

export default Navbar
