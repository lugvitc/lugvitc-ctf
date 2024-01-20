export interface Challenge {
	id: number;
	author: string;
	title: string;
	description: string;
	points: number;
	tags: string[];
}
interface SidebarProps {
	sideState: string;
	setSideState: (newState: string) => void;
}

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
		<div className="fixed mb-8 h-screen overflow-y-scroll bg-midnight-blue bg-opacity-40 px-6 py-6">
			<h1 className=" text-flouroscent-green mt-4 text-2xl font-semibold">
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
									: "border-flouroscent-green text-flouroscent-green border bg-midnight-blue "
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
