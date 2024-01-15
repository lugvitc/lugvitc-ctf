import { Navigate, Outlet } from "react-router-dom";
import Navbar from "../components/shared/Navbar";
import AuthProvider, { useUserContext } from "../context/AuthContext";

const AuthLayout = () => {
	const { isAuthenticated } = useUserContext();
	console.log(isAuthenticated);
	return (
		<>
			{isAuthenticated ? (
				<Navigate to="/" />
			) : (
				<>
					<AuthProvider>
						<Navbar />
					</AuthProvider>
					<section className="flex flex-1 flex-col items-center justify-center py-10">
						<AuthProvider>
							<Outlet />
						</AuthProvider>
					</section>
				</>
			)}
		</>
	);
};

export default AuthLayout;
