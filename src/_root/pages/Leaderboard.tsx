/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";

interface LeaderboardResponse {
	team_name: string;
	score: number;
}

const Leaderboard = () => {
	const [leaderboardData, setLeaderboardData] = useState<LeaderboardResponse[]>(
		[],
	);
	const [isPageVisible, setIsPageVisible] = useState(true);
	const [intervalId, setIntervalId] = useState<number>(0);

	const fetchData = () => {
		axios
			.get<LeaderboardResponse[]>("http://localhost:5000/api/leaderboard")
			.then((response) => response.data)
			.then((data) => setLeaderboardData(data))
			.catch((error) => console.error("Error fetching data:", error));
	};

	useEffect(() => {
		if (isPageVisible) {
			if (document.visibilityState === "visible") {
				const id = setInterval(() => {
					fetchData();
					if (!isPageVisible) clearInterval(id);
				}, 1500);
				console.log(id);
				setIntervalId(id);
			} else {
				if (intervalId) {
					clearInterval(intervalId);
					setIntervalId(0);
				}
			}
		}
		return () => {
			if (intervalId) {
				clearInterval(intervalId);
			}
		};
	}, [isPageVisible]);

	useEffect(() => {
		const handleVisibilityChange = () => {
			setIsPageVisible(false);
			if (document.visibilityState === "visible") {
				// Page is visible, start the interval
				const id = setInterval(fetchData, 1500);
				setIntervalId(id);
			} else {
				// Page is not visible, clear the interval
				if (intervalId) {
					clearInterval(intervalId);
					setIntervalId(0);
				}
			}
		};
		// Add event listener for visibility change
		document.addEventListener("visibilitychange", handleVisibilityChange);

		// Cleanup: Remove event listener and clear interval when the component unmounts
		return () => {
			document.removeEventListener("visibilitychange", handleVisibilityChange);

			if (intervalId) {
				clearInterval(intervalId);
			}
		};
	}, [intervalId]);

	return (
		<div className="flex items-center justify-center p-20">
			<div className=" primary-gradient flex w-[1024px] flex-col gap-4 overflow-auto rounded-xl p-10 ">
				<div className=" flex w-full items-center justify-center font-source-code-pro text-[30px] font-bold">
					Leadboard
				</div>
				{leaderboardData.map((team, index: number) => {
					return (
						<div key={index}>
							<div
								key={team.team_name}
								className={`flex gap-12 ${
									index + 1 <= 3 ? " scale-105" : "scale-95"
								} `}
							>
								<div
									className={`${
										index + 1 === 1 ? "bg-[#ef873e] text-black" : ""
									} ${index + 1 === 2 ? "bg-[#ffffff] text-blue-700" : ""} ${
										index + 1 === 3 ? "bg-[#5fbe40] text-black" : ""
									} flex  w-full items-center justify-between rounded-xl px-3 font-source-code-pro text-[35px] font-bold`}
								>
									<div className="flex gap-4">
										<div className="border-r-2 border-white px-4">
											{index + 1}
										</div>
										<span>{team.team_name}</span>
									</div>
									<span>{team.score}</span>
								</div>
							</div>
							<hr />
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default Leaderboard;
