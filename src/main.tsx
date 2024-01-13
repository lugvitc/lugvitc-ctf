import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";

import "./index.css";
import AuthProvider from "./context/AuthContext.tsx";
import { ReactLenis } from "@studio-freight/react-lenis";

ReactDOM.createRoot(document.getElementById("root")!).render(
	<BrowserRouter>
		<AuthProvider>
			<ReactLenis root>
				<App />
			</ReactLenis>
		</AuthProvider>
	</BrowserRouter>,
);
