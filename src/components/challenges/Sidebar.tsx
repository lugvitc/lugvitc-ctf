import toast from "react-hot-toast";
import { SidebarProps } from "../../types";
import axios from "axios";
import { URL_ORIGIN } from "../../constants";

const Sidebar = ({ sideState, setSideState }: SidebarProps) => {
	const categoryArr = [
		"All",
		"Web exploitation",
		"Cryptography",
		"Binary exploitation",
		"Reverse engineering",
		"Forensics",
		"OSINT",
		"Scripting",
		"Miscellaneous",
	];
	// /ctf/stopall jwt auth send

	function stopAllContainers() {
		const jwt = localStorage.getItem("jwt_token");

		axios
			.post(
				`${URL_ORIGIN}/ctf/stopall`,
				{},
				{
					headers: {
						Authorization: `Bearer ${jwt}`,
					},
				},
			)
			.then((response) => {
				toast("Successfully stopped all the containers");
				console.log(response);
				// Handle successful response here
			})
			.catch((error) => {
				toast("Containers not stopped");
				console.log(error);
				// Handle error here
			});
	}

	return (
		<div className="fixed mb-8 h-screen bg-midnight-blue bg-opacity-40 px-6 py-6">
			<h1 className={` mt-4 text-2xl font-semibold`}>Categories</h1>
			<ul className="mt-6 w-full px-4">
				{categoryArr.map((category, index) => {
					return (
						<li
							key={index}
							className={`my-4 cursor-pointer rounded px-6 py-3 text-lg hover:bg-midnight-blue hover:bg-opacity-50 ${
								sideState !== category
									? "bg-transparent "
									: `border border-fluorescent-green bg-midnight-blue text-fluorescent-green`
							}`}
							onClick={() => {
								setSideState(category);
							}}
						>
							{category}
						</li>
					);
				})}
				<button
					onClick={stopAllContainers}
					className="rounded-sm border border-fluorescent-green bg-midnight-blue p-2"
				>
					Stop All
				</button>
			</ul>
		</div>
	);
};

export default Sidebar;
