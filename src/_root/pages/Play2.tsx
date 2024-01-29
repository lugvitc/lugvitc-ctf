import { useEffect, useState } from "react";
import { Circles } from "react-loader-spinner";
import axios from "axios";
import Sidebar2, { idLookup } from "../../components/challenges/Sidebar2";
import { Container } from "../../types";
import { URL_ORIGIN } from "../../constants";
// import { useUserContext } from "../../context/AuthContext";
import React from "react";
import Card2 from "../../components/challenges/Card2";
// import { Navigate } from "react-router-dom";

const Play2 = () => {
	const [containers, setContainers] = useState<Container[]>([
		// {
		// 	id: 1,
		// 	problem: {
		// 		id: 1,
		// 		name: "foo",
		// 		description: "foo bbbad hjsdgfhjgsdf",
		// 		author: "wizzygekek",
		// 		points: 500,
		// 	},
		// 	solved: true,
		// 	meta_team_id: 3,
		// 	ports: [{ port: 1234 }],
		// },
	]);
	const [loading, setLoading] = useState(false);
	const [sideState, setSideState] = useState<string>("");
	const [refreshKey, setRefreshKey] = useState(0);

	function refreshData() {
		setRefreshKey((prevKey) => prevKey + 1);
	}

	useEffect(() => {
		const jwt = localStorage.getItem("jwt_token");
		axios
			.get<Container[]>(`${URL_ORIGIN}/round2/list`, {
				headers: {
					Authorization: `Bearer ${jwt}`,
				},
			})
			.then((res) => {
				setContainers(res.data);
				setLoading(false);
			})
			.catch((error) => {
				console.log(error);
			});
	}, [refreshKey]);

	// const { isAuthenticated } = useUserContext();
	return (
		<React.Fragment>
			<main className="flex w-full flex-col overflow-x-hidden bg-[#020202] font-source-code-pro">
				<div className="flex h-[80px] w-full p-10 "></div>
				<div className="flex w-screen">
					<div className="relative h-screen w-1/5">
						<Sidebar2 sideState={sideState} setSideState={setSideState} />
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
									{containers
										.filter((container) => {
											return (
												container.meta_team_id === idLookup[sideState] &&
												!container.solved
											);
										})
										.map((container) => (
											<Card2
												container={container}
												key={container.id}
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
};

export default Play2;
