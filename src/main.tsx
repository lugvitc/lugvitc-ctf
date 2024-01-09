import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import {
	createBrowserRouter,
	createRoutesFromElements,
	RouterProvider,
	Route,
} from "react-router-dom";

import "./index.css";
import Rules from "./Rules.tsx";
import PreEvent from "./PreEvent.tsx";

// Read https://reactrouter.com/en/main/route/route
// loaders and actions might be useful for you

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route>
			<Route path="/" element={<App />} />
			{/* For example */}
			{/* <Route path="/leaderboard/" element="33" /> */}
			{/* <Route path="/login" action={TeamLogin} element={<Login />}/> */}
			<Route path="/rules" element={<Rules />} />
			<Route path="/preevent" element={<PreEvent />} />
		</Route>,
	),
);

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>,
);
