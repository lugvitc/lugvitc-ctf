import axios, { AxiosResponse } from "axios";
import { HintModal } from "./Hint";
import { useState } from "react";
export interface Challenge {
	id: number;
	title: string;
	description: string;
	points: number;
}

interface CardProps {
	challenge: Challenge;
}

interface postResponse {
	status?: boolean;
	msg_codes?: string;
}

export function Card({ challenge }: CardProps) {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [status, setStatus] = useState<boolean | undefined>(false);
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [errormsg, setErrormsg] = useState<string | undefined>("");
	const jwt = localStorage.getItem("jwt_token");
	const [flag, setFlag] = useState<string>("");
	const hints: number[] = [1, 2, 3];
	function handleSubmission() {
		axios
			.post(
				`http://localhost:5000/api/ctf/${challenge.id}/flag`,
				{
					flag: flag,
				},
				{
					headers: {
						Authorization: `Bearer ${jwt}`,
					},
				},
			)
			.then((res: AxiosResponse<postResponse>) => {
				setStatus(res.data.status as postResponse["status"]);
			})
			.catch((error) => {
				console.log(error);
			});
	}
	return (
		<div className="m-2 flex w-full flex-col justify-between rounded-xl border border-gray-600 bg-black p-6 shadow-md">
			<div>
				<h3 className="text-center text-3xl font-extrabold text-sky-blue">
					{challenge.title}
				</h3>

				<div className="flex items-start justify-between">
					<div>
						<h3 className="text-xl font-bold text-gray-300">Description</h3>
						<p className="mt-2 text-gray-300">{challenge.description}</p>
						<p className="mt-4 text-gray-400">Points: {challenge.points}</p>
					</div>

					<div className="flex space-x-2">
						{hints.map((hint) => (
							<HintModal key={hint} hintNumber={hint} id={challenge.id} />
						))}
					</div>
				</div>
				<div className="flex w-full flex-col gap-1">
					<label className="text-gray-400">Flag</label>
					<input
						type="text"
						placeholder="flag{}"
						onChange={(e) => setFlag(e.target.value)}
						className="block w-full rounded-lg border border-gray-600 bg-dark-grayish-blue p-2.5 text-sm text-white placeholder-gray-500"
					/>
				</div>
				<button
					className="mt-4 h-12 w-full rounded-xl bg-midnight-blue text-lg font-bold text-white hover:bg-gray-600"
					onClick={handleSubmission}
				>
					Submit
				</button>
			</div>
		</div>
	);
}
