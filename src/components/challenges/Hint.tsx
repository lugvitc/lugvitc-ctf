import { useState } from "react";

interface HintModalProps {
	hintNumber: number;
	hint: string;
}

export const HintModal = ({ hintNumber, hint }: HintModalProps) => {
	const [showModal, setShowModal] = useState(false);

	const toggleModal = () => {
		setShowModal(!showModal);
	};

	return (
		<>
			<button
				className="rounded-full bg-midnight-blue p-2 text-sm text-white hover:bg-dark-grayish-blue"
				onClick={toggleModal}
			>
				{hintNumber}
			</button>

			{showModal && (
				<div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-black bg-opacity-40">
					<div className="relative m-4 max-w-2xl rounded-lg bg-midnight-blue p-8 shadow-lg">
						<div className="mb-4 flex items-center justify-between">
							<h4 className="text-xl font-bold text-sky-blue">
								Hint {hintNumber}
							</h4>
							<button
								className="rounded-full bg-dark-grayish-blue p-2 text-white hover:bg-gray36"
								onClick={toggleModal}
								aria-label="Close"
							>
								&times;{" "}
								{/* This is a multiplication sign, which resembles a close icon */}
							</button>
						</div>
						<p className="text-white">{hint}</p>
					</div>
				</div>
			)}
		</>
	);
};
