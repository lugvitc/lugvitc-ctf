import { SidebarProps } from "../../types";

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
	return (
		<div className="fixed mb-8 h-screen bg-midnight-blue bg-opacity-40 px-6 py-6">
			<h1 className=" mt-4 text-2xl font-semibold text-fluorescent-green">
				Categories
			</h1>
			<ul className="mt-6 w-full px-4">
				{categoryArr.map((category, index) => {
					return (
						<li
							key={index}
							className={`my-4 cursor-pointer rounded px-6 py-3 text-lg hover:bg-midnight-blue hover:bg-opacity-50 ${
								sideState !== category
									? "bg-transparent "
									: "border border-fluorescent-green bg-midnight-blue text-fluorescent-green "
							}`}
							onClick={() => {
								setSideState(category);
							}}
						>
							{category}
						</li>
					);
				})}
			</ul>
		</div>
	);
};

export default Sidebar;
