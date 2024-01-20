import { Outlet } from "react-router-dom";
import Navbar from "../components/shared/Navbar";
import AuthProvider from "../context/AuthContext";

const RootLayout = () => {
	return (
		<>
			<div className="w-full md:flex">
				<AuthProvider>
					<Navbar />
				</AuthProvider>

				<section className="flex w-full items-center justify-center">
					<Outlet />
				</section>
			</div>
		</>
	);
};

export default RootLayout;
