import React from "react";
import ReactDOM from "react-dom/client";
// import App from "./App.tsx";
import {
	createBrowserRouter,
	createRoutesFromElements,
	RouterProvider,
	Route,
} from "react-router-dom";

import "./index.css";
import Rules from "./Rules.tsx";
import PreEvent from "./PreEvent.tsx";
// import LoginPage from "./components/LoginPage.tsx";
import SignUp from "./components/SignUp.tsx";
import LoginPage from "./components/LoginPage.tsx";
import { CtfPage } from "./Ctf.tsx";
// import LeaderBoard from "./components/LeaderBoard.tsx";

// Read https://reactrouter.com/en/main/route/route
// loaders and actions might be useful for you

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route>
			<Route path="/" element={<SignUp />} />
			{/* For example */}
			{/* <Route path="/leaderboard/" element="33" /> */}
			{/* <Route path="/login" action={TeamLogin} element={<Login />}/> */}
			<Route path="/rules" element={<Rules />} />
			<Route path="/preevent" element={<PreEvent />} />
			<Route path="/log-in" element={<LoginPage />} />
			<Route path="/sign-up" element={<SignUp />} />
			<Route path="/ctf" element={<CtfPage />} />
		</Route>,
	),
);

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>,
);
