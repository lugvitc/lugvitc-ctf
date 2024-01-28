import { SidebarProps2 } from "../../types";
import axios from "axios";
import { useEffect, useState } from "react";
import { URL_ORIGIN } from "../../constants";

const Sidebar = ({ sideState, setSideState }: SidebarProps2) => {
	const moonsArray = [
		"Mimas",
		"Enceladus",
		"Tethys",
		"Dione",
		"Rhea",
		"Titan",
		"Hyperion",
		"Iapetus",
		"Phoebe",
		"Janus",
		"Epimetheus",
		"Pan",
	];
	const [currTeam, setCurrTeam] = useState<string>();
	useEffect(() => {
		axios
			.get<string>(`${URL_ORIGIN}/api/teams/me`)
			.then((res) => {
				setCurrTeam(res.data);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);
	return (
		<div className="fixed mb-8 h-screen overflow-y-scroll bg-midnight-blue bg-opacity-40 px-6 py-6">
			<h1 className=" text-flouroscent-green mt-4 text-2xl font-semibold">
				Categories
			</h1>
			<ul className="mt-6 w-full px-4">
				<li>{currTeam}</li>
				{moonsArray.map((m_name, index) => {
					return (
						<li
							key={index}
							className={`my-4 cursor-pointer rounded px-6 py-3 text-lg hover:bg-midnight-blue hover:bg-opacity-50 ${
								sideState !== m_name
									? "bg-transparent "
									: "border-flouroscent-green text-flouroscent-green border bg-midnight-blue "
							}`}
							onClick={() => {
								setSideState(m_name);
							}}
						>
							{m_name}
						</li>
					);
				})}
			</ul>
		</div>
	);
};

export default Sidebar;
