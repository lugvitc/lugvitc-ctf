
import { NavLink, useLocation } from "react-router-dom"
import { leftSidebarLinks } from "../constants"

interface Location {
    pathname: string;
}

const isAuthenticated: boolean = false;

const LeftSideBar = () => {

    const location = useLocation() as Location;
    const pathname = location.pathname;

    return (
        <div className='max-lg:w-[200px] hidden max-lg:flex max-sm:hidden h-screen fixed left-0 top-0 flex-col bg-black justify-between overflow-y-auto p-6 pt-36'>
            <div className="flex flex-1 flex-col gap-6">
                {leftSidebarLinks.map((link) => {
                    const isActive = pathname === link.route;
                    return (
                        <NavLink
                            key={link.label}
                            to={link.route}
                            className={`${isActive
                                ? "primary-gradient rounded-lg text-light-900"
                                : "text-dark300_light900"
                                }  flex justify-start gap-4 bg-transparent p-4 rounded-xl`}
                        >
                            <img
                                src={link.img}
                                alt={link.label}
                                width={20}
                                height={20}
                                className={`${isActive ? "" : "invert-colors"}`}
                            />
                            <p className={`${isActive ? 'text-[15px] font-bold leading-[140%]' : 'text-[18px] font-medium leading-[25.2px]'}`}>{link.label}</p>
                        </NavLink>
                    )
                })}

            </div>
            {/* TODO: ADD REAL AUTH */}

            {isAuthenticated === false && (

                <div className="flex flex-col gap-6">
                    <NavLink to="/log-in">
                        <button className='text-[15px] font-bold leading-[140%] hover:text-[#78CBFF] hover:border-[#78CBFF] border rounded-xl w-full px-4 py-2 shadow-none'>
                            Log In
                        </button>
                    </NavLink>
                    <NavLink to="/sign-up">
                        <button className='text-[15px] font-bold leading-[140%] text-[#78CBFF] border-[#78CBFF] hover:text-white hover:border-white border w-full rounded-xl px-4 py-2 shadow-none'>
                            Sign Up
                        </button>
                    </NavLink>

                </div>

            )}
            <NavLink
                to={`/more`}
                className={` border p-2 px-3 rounded-xl flex justify-center mt-6 mb-6`}

            >
                MORE
            </NavLink>
        </div >
    )
}

export default LeftSideBar
