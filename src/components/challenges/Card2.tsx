import { useState } from "react";
import { Round2ChallengeModal } from "./Round2ChallengeModal";
import { CardProps2 } from "../../types";
import { moonsArray } from "./Sidebar2";

export default function Card2({ container, handleSolved }: CardProps2) {
	const [isClicked, setIsClicked] = useState<boolean>(false);

	const handleModalOpen = () => {
		// console.log("Opening modal");
		setIsClicked(true);
		console.log(isClicked);
	};

	const handleModalClose = (e: React.MouseEvent) => {
		e.stopPropagation();
		// console.log("Closing modal");
		setIsClicked(false);
	};

	return (
		<div>
			<div onClick={() => handleModalOpen()}>
				<div className=" h w-full overflow-x-clip rounded-xl bg-[#08FF08] transition-all duration-150">
					<div className=" h w-full bg-midnight-blue transition-all duration-150 hover:scale-[0.99] hover:rounded-xl">
						<div className=" flex items-center px-3 ">
							<div className="flex items-center">
								<div className=" px-1 ">
									<span className="red box inline-block h-3 w-3 items-center rounded-full bg-red-600 p-1"></span>
								</div>
								<div className=" px-1 py-1">
									<span className="yellow box inline-block h-3 w-3 items-center rounded-full bg-yellow-500 p-1"></span>
								</div>
								<div className=" px-1 py-1">
									<span className="green box inline-block h-3 w-3 items-center rounded-full bg-green-500 p-1"></span>
								</div>
							</div>

							<div className="mb-3 mt-3 grow text-center text-2xl font-semibold text-[#08FF08]">
								{container.problem.name}
							</div>
						</div>
						<hr className="m-auto w-[95%] border border-[#08FF08] opacity-30" />
						<div className="content mt-1 flex flex-col gap-3 px-4 py-2 font-source-code-pro text-white">
							<div className="flex gap-1 font-source-code-pro text-xs text-[#08FF08] md:text-sm lg:text-base">
								<span className="text-white">
									author@lug.ctf:
									<span className="font-bold text-sky-blue">~</span>${" "}
								</span>
								{container.problem.author}
							</div>
							<div className="flex gap-1 font-source-code-pro text-xs text-[#08FF08] md:text-sm lg:text-base">
								<span className="text-white">
									description@lug@ctf:
									<span className="font-bold text-sky-blue">~</span>${" "}
								</span>
								<span className="line-clamp-2">
									{container.problem.description}
								</span>
							</div>
							<div className="flex gap-1 font-source-code-pro text-xs text-[#08FF08] md:text-sm lg:text-base">
								<span className="text-white">
									points@lug@ctf:
									<span className="font-bold text-sky-blue">~</span>${" "}
								</span>
								{container.problem.points}
							</div>
							<div className="my-4 max-w-fit items-center rounded bg-fluorescent-green bg-opacity-10 px-4 py-2 text-center">
								{moonsArray[container.meta_team_id - 1]}
							</div>
						</div>
					</div>
				</div>
				{isClicked && (
					<Round2ChallengeModal
						container={container}
						isClicked={isClicked}
						closeModal={handleModalClose}
						handleSolved={handleSolved}
					/>
				)}
			</div>
		</div>
	);
}
