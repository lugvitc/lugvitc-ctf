import axios from "axios";
import { useState, useEffect } from "react";

interface HintModalProps {
	hintNumber: number;
	id: number;
}
interface Hint {
	msg_code?: string;
	text?: string;
	order?: number;
}

export const HintModal = ({ hintNumber, id }: HintModalProps) => {
	const [hint, setHint] = useState<Hint | null>({
		msg_code: "",
		text: "",
		order: 0,
	});
	const [clicked, setClicked] = useState<boolean>(false);
	const [showModal, setShowModal] = useState<boolean>(false);

	const handleClick = () => {
		setClicked(!clicked);
	};
	useEffect(() => {
		if (clicked) {
			const jwt = localStorage.getItem("jwt_token");
			axios
				.get(`http://localhost:5000/api/${id}/hint`, {
					headers: {
						Authorization: `Bearer ${jwt}`,
					},
				})
				.then((res) => {
					setHint(res.data as Hint);
					setShowModal(true);
				})
				.catch((error) => {
					setShowModal(false);
					console.log(error);
				});
		}
	}, [clicked, id]);

	return (
		<>
			<button
				className="rounded-full bg-midnight-blue p-2 text-sm text-white hover:bg-dark-grayish-blue"
				onClick={handleClick}
			>
				{hintNumber}
			</button>

			{clicked && (
				<div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-black bg-opacity-40">
					<div className="relative m-4 max-w-2xl rounded-lg bg-midnight-blue p-8 shadow-lg">
						<div className="mb-4 flex items-center justify-between">
							<h4 className="text-xl font-bold text-sky-blue">
								{showModal ? <p>Hint {hintNumber}</p> : hint?.msg_code}
							</h4>
							<button
								className="rounded-full bg-dark-grayish-blue p-2 text-white hover:bg-gray36"
								onClick={handleClick}
								aria-label="Close"
							>
								&times;{" "}
								{/* This is a multiplication sign, which resembles a close icon */}
							</button>
						</div>
						<p className="text-white">{showModal ? hint?.text : null}</p>
					</div>
				</div>
			)}
		</>
	);
};
