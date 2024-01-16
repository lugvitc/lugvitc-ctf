import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

type DecodedToken = {
	exp: number;
};

type AuthContextType = {
	isAuthenticated: boolean;
	setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
};

const PreEventWrap = createContext<AuthContextType>({
	isAuthenticated: false,
	setIsAuthenticated: () => {},
});
const PreEventProvider = ({ children }: { children: React.ReactNode }) => {
	const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

	const navigate = useNavigate();

	useEffect(() => {
		const jwt_token = localStorage.getItem("jwt_token");
		if (jwt_token && jwt_token !== "" && jwt_token !== "[]") {
			setIsAuthenticated(true);

			// COMMENT OUT BELOW IF WORKING ON FRONTEND AND NO JWT AVAILABLE

			// GETTING THE EXPIRY OF TOKEN
			const decodedToken = jwtDecode<DecodedToken>(jwt_token);
			const currentTime = Date.now() * 1000;

			// IF TOKEN HAS EXPIRED
			if (decodedToken.exp < currentTime) {
				setIsAuthenticated(false);
				navigate("/sign-in");
			} else {
				// IF IT HASNT EXPIRED
				setIsAuthenticated(true);
				const timeout = (decodedToken.exp - currentTime) * 1000;
				setTimeout(() => {
					setIsAuthenticated(false);
					navigate("/sign-in");
				}, timeout);
			}
			// ----------------------------------------------------------------
		} else {
			// If no token is present
			const currentDate = new Date();
			const targetDate = new Date("2024-01-29");

			if (currentDate < targetDate) {
				// For dates before January 29, 2024
				navigate("/preevent");
			} else {
				// For dates on or after January 29, 2024
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<PreEventWrap.Provider value={{ isAuthenticated, setIsAuthenticated }}>
			{children}
		</PreEventWrap.Provider>
	);
};

// eslint-disable-next-line react-refresh/only-export-components
export const useUserContext = () => useContext(PreEventWrap);
export default PreEventProvider;
