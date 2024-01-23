import { HomeNavbarLinks } from "../types";

export const leftSidebarLinks: HomeNavbarLinks[] = [
	{
		img: "/src/assets/icons/home.svg",
		route: "/",
		label: "Home",
	},
	{
		img: "/src/assets/icons/home.svg",
		route: "/play",
		label: "Play",
	},
	{
		img: "/src/assets/icons/leaderboard1.png",
		route: "/leaderboard",
		label: "Top",
	},
];
export const homeNavbarLinks: HomeNavbarLinks[] = [
	{
		img: "/src/assets/icons/home.svg",
		route: "/",
		label: "Home",
	},
	{
		img: "/src/assets/icons/home.svg",
		route: "/play",
		label: "Play",
	},
	{
		img: "/src/assets/icons/home.svg",
		route: "/leaderboard",
		label: "Top",
	},
];

export const URL_ORIGIN = "https://pwncore.lugvitc.org/api";

export const TOAST_MESSAGES = {
	DB_ERROR: "DB error",
	PORT_LIMIT_REACHED: "Port limit reached",
	CTF_NOT_FOUND: "CTF not found",
	CONTAINER_START: "Container started",
	CONTAINER_STOP: "Container stopped",
	CONTAINERS_TEAM_STOP: "Containers team stop",
	CONTAINER_NOT_FOUND: "Container not found",
	CONTAINER_ALREADY_RUNNING: "Container is already running",
	CONTAINER_LIMIT_REACHED: "Container limit reached",
	HINT_LIMIT_REACHED: "Hint limit reached",
	TEAM_NOT_FOUND: "Team not found",
	USER_NOT_FOUND: "User not found",
	CTF_SOLVED: "CTF solved",
	SIGNUP_SUCCESS: "Signup success",
	WRONG_PASSWORD: "Wrong password",
	LOGIN_SUCCESS: "Login success",
	TEAM_EXISTS: "Team exists",
	USER_ADDED: "User added",
	USER_REMOVED: "User removed",
	USER_ALREADY_IN_TEAM: "User already in team",
	USER_NOT_IN_TEAM: "User not in team",
	INSUFFICIENT_COINS: "Insufficient coins",
	USER_OR_EMAIL_EXISTS: "User or email exists",
	USERS_NOT_FOUND: "Users not found",
};

export const categoryArr = [
	"Web exploitation",
	"Cryptography",
	"Binary exploitation",
	"Reverse engineering",
	"Forensics",
	"OSINT",
	"Scripting",
	"Miscellaneous",
].reverse();
