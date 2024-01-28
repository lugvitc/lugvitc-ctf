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
import Play2 from "./_root/pages/Play2";
import Leaderboard2 from "./_root/pages/LeaderBoard2";
// import RoundTwoLeaderboard from "./_root/pages/RoundTwoLeaderboard";
// import { RoundTwoCTF } from "./_root/pages/RoundTwoCTF";
export default function App() {
	return (
		<main className="flex">
			<Routes>
				{new Date() >= new Date("2024-01-29") ? (
					<>
						<Route path="/preevent" element={<PreEvent />} />
						<Route index element={<PreEvent />} />
					</>
				) : (
					<>
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
							<Route path="/play" element={<CtfPage />} />
							<Route path="/round-2/leaderboard-2" element={<Leaderboard2 />} />
							<Route path="/round-2/play-2" element={<Play2 />} />
						</Route>

						<Route path="/preevent" element={<PreEvent />} />
					</>
				)}
			</Routes>
		</main>
	);
}
