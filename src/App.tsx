import { Routes, Route } from "react-router-dom";
import AuthLayout from "./_auth/AuthLayout";
import LoginPage from "./_auth/forms/LoginPage";
import SignUp from "./_auth/forms/SignUp";
import RootLayout from "./_root/RootLayout";
import { LandingPage } from "./_root/pages";
import Rules from "./_root/pages/Rules";
import Leaderboard from "./_root/pages/Leaderboard";
import PreEvent from "./_root/pages/PreEvent";
import { CtfPage } from "./_root/pages/Ctf";

export default function App() {
	return (
		<main className="flex">
			<Routes>
				{/* public route */}
				<Route element={<AuthLayout />}>
					<Route path="/sign-in" element={<LoginPage />} />
					<Route path="/sign-up" element={<SignUp />} />
				</Route>

				{/* private route */}
				<Route element={<RootLayout />}>
					<Route index element={<LandingPage />} />
					<Route path="/rules" element={<Rules />} />
					<Route path="/leaderboard" element={<Leaderboard />} />
					<Route path="/preevent" element={<PreEvent />} />
					<Route path="/play" element={<CtfPage />} />
				</Route>
			</Routes>
		</main>
	);
}
