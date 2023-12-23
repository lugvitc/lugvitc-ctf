import { NavLink } from "react-router-dom";

const isAuthenticated = false; // TODO: replace with actual auth

const LandingPage = () => {
    return (
        <>
            <div className="flex justify-center items-center flex-row mx-24 h-screen">
                <div className="flex flex-col justify-start max-xl:justify-center">
                    <div className="flex flex-col justify-start">
                        <h1 className="font-source-code-pro text-[100px] font-bold leading-[140%] max-xl:text-[80px]">
                            PWNC0R3
                        </h1>
                        <span className="font-source-code-pro text-[35px] max-xl:text-[25px] font-medium">Just high quality CTFs made with ❤️</span>
                    </div>
                    <div className="max-w-[562px] mt-14 ">
                        <span className="font-source-code-pro text-[28px] max-xl:text-[23px] font-normal">Solve brain wracking challenges as a team or as a lone wolf and dominate the leaderboard to win.</span>
                    </div>
                    <div className="flex gap-8 mt-8 pt-8">

                        {/* TODO: replace with actual auth */}

                        {!isAuthenticated && (
                            <>
                                <NavLink to="/log-in">
                                    <button className='text-[24px] hover:text-[#78CBFF] hover:transition-all hover:border-[#78CBFF] border rounded-xl w-full px-4 py-2 shadow-none'>
                                        Log In
                                    </button>
                                </NavLink>
                                <span className="font-DM-Mano text-[24px] font-normal italic">-or-</span>
                                <NavLink to="/sign-up">
                                    <button className='text-[24px] border border-[#78CBFF] text-[#78CBFF]  hover:text-white hover:border-white w-full rounded-xl px-4 py-2 shadow-none'>
                                        Sign Up
                                    </button>
                                </NavLink>
                            </>
                        )}
                    </div>
                </div>
                <div className="mt-24 max-lg:hidden">
                    <img
                        src="src/assets/images/landingPageTux.png"
                        alt="Tux"
                    />
                </div>

            </div>
            <img
                src="src/assets/images/someWhiteObjectImage.png"
                alt="White object"
            />

        </>


    )
}

export default LandingPage
