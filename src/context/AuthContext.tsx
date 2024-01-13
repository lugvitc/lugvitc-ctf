import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { createContext, useEffect, useState } from "react";
// import { jwtDecode } from "jwt-decode";

// type DecodedToken = {
// 	exp: number;
// };

type AuthContextType = {
	isAuthenticated: boolean;
	setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
};

const AuthContextWrap = createContext<AuthContextType>({
	isAuthenticated: false,
	setIsAuthenticated: () => { },
});
const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

	const navigate = useNavigate();

	useEffect(() => {
		const jwt_token = localStorage.getItem("jwt_token");
		if (jwt_token && jwt_token !== "" && jwt_token !== "[]") {
			setIsAuthenticated(true);


			// COMMENT OUT BELOW IF WORKING ON FRONTEND AND NO JWT AVAILABLE

			// GETTING THE EXPIRY OF TOKEN
			// const decodedToken = jwtDecode<DecodedToken>(jwt_token);
			// const currentTime = Date.now() * 1000;

			// // IF TOKEN HAS EXPIRED
			// if (decodedToken.exp < currentTime) {
			// 	setIsAuthenticated(false);
			// 	navigate("/sign-in");
			// } else {
			// 	// IF IT HASNT EXPIRED
			// 	setIsAuthenticated(true);
			// 	const timeout = (decodedToken.exp - currentTime) * 1000;
			// 	setTimeout(() => {
			// 		setIsAuthenticated(false);
			// 		navigate("/sign-in");
			// 	}, timeout);
			// }
			// ----------------------------------------------------------------
		} else {
			// FOR PRE-EVENT CHANGE ROUTE TO "/preevent"
			navigate("/sign-in");
			// if no preevent and testing purposes change to "/sign-in"
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<AuthContextWrap.Provider value={{ isAuthenticated, setIsAuthenticated }}>
			{children}
		</AuthContextWrap.Provider>
	);
};

// eslint-disable-next-line react-refresh/only-export-components
export const useUserContext = () => useContext(AuthContextWrap);
export default AuthProvider;
