export type HomeNavbarLinks = {
	img: string;
	route: string;
	label: string;
};

export interface ResponseData {
	msg_code?: number;
}
export interface Question {
	id: number;
	author: string;
	name: string;
	description: string;
	points: number;
	tags: string[];
}

export interface ChallengeModalProp {
	question: Question;
	isClicked: boolean;
	closeModal: (e: React.MouseEvent) => void;
}

export interface ResponseData {
	msg_code?: number;
	ports?: number[];
	ctf_id?: number;
}
export interface StopResponseData {
	msg_code: number;
}

export interface hintResponseData {
	msg_code?: number;
	text?: string;
	order?: number;
}

export interface FlagResponse {
	msg_code?: number;
	status: boolean;
}
export interface Hints {
	[key: number]: string;
}

export interface ChallengeCategories {
	[key: string]: Challenge[];
	All: Challenge[];
	"Web exploitation": Challenge[];
	Cryptography: Challenge[];
	"Binary exploitation": Challenge[];
	"Reverse engineering": Challenge[];
	Forensics: Challenge[];
	OSINT: Challenge[];
	Scripting: Challenge[];
	Miscellaneous: Challenge[];
}
export interface Challenge {
	id: number;
	author: string;
	name: string;
	description: string;
	points: number;
	tags: string[];
}

export interface ChallengeBackend {
	id: number;
	author: string;
	name: string;
	description: string;
	points: number;
	tags: unknown; // actually number
}

export interface LoginResponse {
	msg_code: number;
	access_token?: string;
	token_type?: string;
}
export interface LeaderboardResponse {
	team_name: string;
	score: number;
}
export interface Challenge {
	id: number;
	author: string;
	name: string;
	description: string;
	points: number;
	tags: string[];
}

export interface CardProps {
	challenge: Challenge;
}
export interface SidebarProps {
	sideState: string;
	setSideState: (newState: string) => void;
}
export interface QuestionData {
	id: number;
	name: string;
	description: string;
	points: number;
	url: string;
	author: string;
}

export interface QuestionProps {
	question: QuestionData;
	// setCoins: React.Dispatch<React.SetStateAction<number>>;
	day: number;
}

export interface ResponseData {
	msg_code?: number;
	status?: boolean;
	coins?: number;
}

export type x = {
	regNo: string;
	email: string;
} | null;

export type Hider = {
	[key: string]: { opacity: number };
};
export interface Location {
	pathname: string;
}

export interface Props {
	isOpen: boolean;
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
export interface SignupResponse {
	msg_code: number;
}
