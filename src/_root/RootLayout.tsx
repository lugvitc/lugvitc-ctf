import { Outlet } from "react-router-dom";
import Navbar from "../components/shared/Navbar";
import AuthProvider from "../context/AuthContext";

const RootLayout = () => {
	const currentDate = new Date();
	const targetDate = new Date("2024-01-29");

	const renderAuthProviderAndNavbar = () => {
		if (currentDate > targetDate) {
			return (
				<AuthProvider>
					<Navbar />
				</AuthProvider>
			);
		}
		return null;
	};

	return (
		<>
			<div className="w-full md:flex">
				{renderAuthProviderAndNavbar()}

				<section className="flex w-full items-center justify-center">
					<Outlet />
				</section>
			</div>
		</>
	);
};

export default RootLayout;
