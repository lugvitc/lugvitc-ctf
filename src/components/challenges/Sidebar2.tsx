import { SidebarProps2 } from "../../types";
import axios from "axios";
import { useEffect, useState } from "react";
import { URL_ORIGIN } from "../../constants";

export const moonsArray = [
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

type lookup = {
	[moon: string]: number;
};

export const idLookup: lookup = {};

moonsArray.forEach((moon, index) => {
	idLookup[moon] = index + 1;
});

type response = {
	meta_team__name: string
}

const Sidebar = ({ sideState, setSideState }: SidebarProps2) => {
	const [currTeam, setCurrTeam] = useState<string>("");
	useEffect(() => {
		const jwt = localStorage.getItem("jwt_token");
		axios
			.get<response>(`${URL_ORIGIN}/team/me`, {
				headers: {
					Authorization: `Bearer ${jwt}`,
				},
			})
			.then((res) => {
				setCurrTeam(res.data.meta_team__name);
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
				<li
					className={`my-4 cursor-pointer rounded px-6 py-3 text-lg hover:bg-midnight-blue hover:bg-opacity-50 ${
						sideState !== currTeam
							? "bg-transparent "
							: " border border-fluorescent-green bg-midnight-blue text-fluorescent-green "
					}`}
					onClick={() => {
						setSideState(currTeam);
					}}
				>
					{currTeam}
				</li>
				{moonsArray
					.filter((m_name) => {
						return m_name !== currTeam;
					})
					.map((m_name, index) => {
						return (
							<li
								key={index}
								className={`my-4 cursor-pointer rounded px-6 py-3 text-lg hover:bg-midnight-blue hover:bg-opacity-50 ${
									sideState !== m_name
										? "bg-transparent "
										: " border border-fluorescent-green bg-midnight-blue text-fluorescent-green "
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
