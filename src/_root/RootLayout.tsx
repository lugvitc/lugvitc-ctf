import { Outlet } from "react-router-dom";
// import { Navigate } from 'react-router-dom';
import Navbar from "../components/shared/Navbar";

const RootLayout = () => {
	// const isAuthenticated = false;

	return (
		<>
			<div className="w-full md:flex">
				<Navbar />

				<section className="flex w-full items-center justify-center ">
					<Outlet />
				</section>
			</div>
		</>
	);
};

export default RootLayout;
