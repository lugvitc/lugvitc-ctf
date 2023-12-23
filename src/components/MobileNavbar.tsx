
import { NavLink, useLocation } from "react-router-dom"
import { leftSidebarLinks } from "../constants"

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
        <div className={` hidden max-sm:flex flex-col fixed px-6 top-0 left-0 h-screen w-9/12 overflow-auto bg-black shadow-xl z-sheet transition-transform duration-300 ease-in-out ${isOpen ? 'transform translate-x-0' : '-translate-x-full'}`}>
            <div className="flex gap-4 items-center justify-start mt-6 px-6">
                <img
                    src="src/assets/images/club-logo.png"
                    alt="logo"
                    className="w-[52px] h-[52px]"
                />
                <span className="text-white font-DM-Mono">Linux Club VITC</span>
            </div>
            <div className="flex flex-1 flex-col gap-6 mt-24 justify-start  ">
                {leftSidebarLinks.map((link) => {
                    const isActive = pathname === link.route;
                    return (
                        <NavLink
                            key={link.label}
                            to={link.route}
                            className={`${isActive
                                ? "primary-gradient rounded-lg text-light-900"
                                : "text-dark300_light900"
                                }  flex justify-start gap-4 bg-transparent p-4 rounded-xl w-full`}
                            onClick={() => { setIsOpen(!isOpen) }}
                        >
                            <img
                                src={link.img}
                                alt={link.label}
                                width={20}
                                height={20}
                                className={`${isActive ? "" : "invert-colors"}`}
                            />
                            <p className={`${isActive ? 'text-[18px] font-bold leading-[140%]' : 'text-[18px] font-medium leading-[25.2px]'}`}>{link.label}</p>
                        </NavLink>
                    )
                })}

            </div>

            {/* TODO: ADD REAL AUTH */}
            {isAuthenticated === false && (

                <div className="flex flex-col gap-6 mb-6">
                    <NavLink to="/log-in">
                        <button className='text-[15px] font-bold leading-[140%] primary-gradient min-h-[41px] w-full rounded-xl px-4 py-3 shadow-none'>
                            <span className='text-white'>Log In</span>
                        </button>
                    </NavLink>
                    <NavLink to="/sign-in">
                        <button className='text-[15px] font-bold leading-[140%] border min-h-[41px] w-full rounded-xl px-4 py-3 shadow-none'>
                            <span className='text-white'>Sign In</span>
                        </button>
                    </NavLink>

                </div>

            )}
            <NavLink
                to={`/more`}
                className={` border p-2 px-3 rounded-xl flex justify-center mb-6`}

            >
                MORE
            </NavLink>
        </div >
    )
}

export default MobileNavbar
