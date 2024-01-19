import { useEffect, useState } from "react";
import { Card } from "../../components/challenges/Card";
// import {Question} from '../../components/preevent/Question';
import axios from "axios";
import { URL_ORIGIN } from "../../constants";
import Sidebar from "../../components/challenges/Sidebar";
import { Circles } from "react-loader-spinner";

interface ChallengeCategories {
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
	points: unknown; // actually number
	tags: number;
}

const categoryArr = [
	"Web exploitation",
	"Cryptography",
	"Binary exploitation",
	"Reverse engineering",
	"Forensics",
	"OSINT",
	"Scripting",
	"Miscellaneous",
].reverse();

const bsToTags = (bs: number) => {
	const tags = [];
	for (let i = 0; i < 8; i++) {
		if ((bs & 1) !== 0) {
			tags.push(categoryArr[i]);
		}
		bs >>= 1;
	}
	return tags;
};

export function CtfPage() {
	const [challenges, setChallenges] = useState<Challenge[]>([]);
	// const [question, setQuestion] = useState<Challenge[]>([]);
	const [loading, setLoading] = useState(false);

	// seed some challenges
	if (challenges.length === 0) {
		setChallenges([
			{
				id: 1,
				author: "author",
				name: "Challenge 1",
				description: "This is a description",
				points: 100,
				tags: ["Web exploitation", "Cryptography"],
			},
			{
				id: 2,
				author: "author",
				name: "Challenge 2",
				description: "This is a description",
				points: 100,
				tags: ["Cryptography", "Forensics"],
			},
			{
				id: 3,
				author: "author",
				name: "Challenge 3",
				description: "This is a description",
				points: 100,
				tags: ["Web exploitation", "Forensics", "Miscellaneous"],
			},
			{
				id: 4,
				author: "author",
				name: "Challenge 4",
				description: "This is a description",
				points: 100,
				tags: ["Cryptography", "Reverse engineering"],
			},
			{
				id: 5,
				author: "author",
				name: "Challenge 5",
				description: "This is a description",
				points: 100,
				tags: ["Web exploitation", "Binary exploitation"],
			},
			{
				id: 6,
				author: "author",
				name: "Challenge 6",
				description: "This is a description",
				points: 100,
				tags: ["Binary exploitation", "Scripting", "Miscellaneous"],
			},
			{
				id: 7,
				author: "author",
				name: "Challenge 7",
				description: "This is a description",
				points: 100,
				tags: ["Reverse engineering", "OSINT"],
			},
			{
				id: 8,
				author: "author",
				name: "Challenge 8",
				description: "This is a description",
				points: 100,
				tags: [
					"Binary exploitation",
					"Reverse engineering",
					"Miscellaneous",
					"OSINT",
					"Scripting",
				],
			},
			{
				id: 9,
				author: "author",
				name: "Challenge 6",
				description: "This is a description",
				points: 100,
				tags: ["Binary exploitation", "Scripting", "Miscellaneous"],
			},
			{
				id: 10,
				author: "author",
				name: "Challenge 7",
				description: "This is a description",
				points: 100,
				tags: ["Reverse engineering", "OSINT"],
			},
			{
				id: 11,
				author: "author",
				name: "Challenge 8",
				description: "This is a description",
				points: 100,
				tags: ["Binary exploitation", "Reverse engineering", "Miscellaneous"],
			},
		]);
	}

	useEffect(() => {
		axios
			.get<ChallengeBackend[]>(`${URL_ORIGIN}/ctf/list`)
			.then((res) => {
				setChallenges(
					res.data.map((x: ChallengeBackend) => {
						x.tags = bsToTags(x.tags);
						return x as unknown as Challenge;
					}) as unknown as Challenge[],
				);
				setLoading(false);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);
	// TODO: Fetch challenges from the server

	const [sideState, setSideState] = useState<string>("All");
	const categories: ChallengeCategories = {
		All: challenges,
		"Web exploitation": challenges.filter((challenge: Challenge) => {
			return challenge.tags.includes("Web exploitation");
		}),
		Cryptography: challenges.filter((challenge: Challenge) => {
			return challenge.tags.includes("Cryptography");
		}),
		"Binary exploitation": challenges.filter((challenge: Challenge) => {
			return challenge.tags.includes("Binary exploitation");
		}),
		"Reverse engineering": challenges.filter((challenge: Challenge) => {
			return challenge.tags.includes("Reverse engineering");
		}),
		Forensics: challenges.filter((challenge: Challenge) => {
			return challenge.tags.includes("Forensics");
		}),
		OSINT: challenges.filter((challenge: Challenge) => {
			return challenge.tags.includes("OSINT");
		}),
		Scripting: challenges.filter((challenge: Challenge) => {
			return challenge.tags.includes("Scripting");
		}),
		Miscellaneous: challenges.filter((challenge: Challenge) => {
			return challenge.tags.includes("Miscellaneous");
		}),
	};
	const questionList: Challenge[] = categories[sideState];
	return (
		<main className="flex w-full flex-col bg-[#020202] font-source-code-pro">
			<div className="flex h-[80px] w-full p-10 "></div>
			<div className="flex w-screen">
				<div className="relative h-screen w-1/5">
					<Sidebar sideState={sideState} setSideState={setSideState} />
				</div>
				<div className="flex min-h-screen w-4/5 flex-col flex-wrap items-center overflow-y-auto bg-[#020202]">
					{loading ? (
						<div className="flex h-screen items-center justify-center">
							<Circles
								height="80"
								width="80"
								color="green"
								ariaLabel="three-dots-loading"
							/>
						</div>
					) : (
						<>
							<h1 className="my-10 text-4xl font-bold text-flouroscent-green ">
								{sideState}
							</h1>
							<div className="grid w-10/12 grid-cols-2 gap-10 ">
								{questionList.map((challenge) => (
									<Card challenge={challenge} key={challenge.id} />
								))}
							</div>
						</>
					)}
				</div>
			</div>
		</main>
	);
}
