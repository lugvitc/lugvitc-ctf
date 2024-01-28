import { useEffect, useState } from "react";
import { Card } from "../../components/challenges/Card";
// import {Question} from '../../components/preevent/Question';
import axios from "axios";
import { URL_ORIGIN } from "../../constants";
import Sidebar from "../../components/challenges/Sidebar";
import { Circles } from "react-loader-spinner";
import { ChallengeCategories, Challenge, ChallengeBackend } from "../../types";
import { categoryArr } from "../../constants";
import { useUserContext } from "../../context/AuthContext";
import { Navigate } from "react-router-dom";
import React from "react";

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
	const [refreshKey, setRefreshKey] = useState(0);

	function refreshData() {
		setRefreshKey((prevKey) => prevKey + 1);
	}

	useEffect(() => {
		const jwt = localStorage.getItem("jwt_token");

		Promise.all([
			axios.get<ChallengeBackend[]>(`${URL_ORIGIN}/ctf/list`),
			// assuming completed problem interface === problems in /api/ctf/list
			axios.get<ChallengeBackend[]>(`${URL_ORIGIN}/ctf/completed`, {
				headers: {
					Authorization: `Bearer ${jwt}`,
				},
			}),
		])
			.then(([challengeResponse, completedResponse]) => {
				const completedChallengeIds = new Set(
					completedResponse.data.map((c) => c.id),
				);
				const challenges = challengeResponse.data
					.filter((challenge) => !completedChallengeIds.has(challenge.id))
					.map((x: ChallengeBackend) => {
						x.tags = bsToTags(x.tags as number);
						return x as unknown as Challenge;
					}) as unknown as Challenge[];
				setChallenges(challenges);
				setLoading(false);
			})
			.catch((error) => {
				console.log(error);
			});
	}, [refreshKey]);

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
	const initialStartStates = questionList.reduce<{ [key: number]: boolean }>(
		(acc, challenges) => {
			acc[challenges.id] = false;
			return acc;
		},
		{},
	);

	const [startStates, setStartStates] = useState(initialStartStates);
	const handleStartChange = (id: number, isStart: boolean) => {
		setStartStates((prevStates) => ({ ...prevStates, [id]: isStart }));
	};
	// const { isAuthenticated } = useUserContext();
	return (
		<React.Fragment>
			<main className="flex w-full flex-col overflow-x-hidden bg-[#020202] font-source-code-pro">
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
								<h1 className="my-10 text-4xl font-bold text-fluorescent-green ">
									{sideState}
								</h1>
								<div className="grid w-10/12 grid-cols-2 gap-10 ">
									{questionList.map((challenge) => (
										<Card
											challenge={challenge}
											key={challenge.id}
											isStart={startStates[challenge.id]}
											handleStartChange={handleStartChange}
											handleSolved={refreshData}
										/>
									))}
								</div>
							</>
						)}
					</div>
				</div>
			</main>
		</React.Fragment>
	);
}
