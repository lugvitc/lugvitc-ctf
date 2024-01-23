import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";

import "./index.css";
import { ReactLenis } from "@studio-freight/react-lenis";
// import PreEventProvider from "./context/PreeventContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
	<BrowserRouter>
		{/* <PreEventProvider> */}
		<ReactLenis root>
			<App />
		</ReactLenis>
		{/* </PreEventProvider> */}
	</BrowserRouter>,
);
