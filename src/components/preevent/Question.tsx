export interface QuestionData {
	title: string;
	description: string;
	points: number;
}

export interface QuestionProps {
	question: QuestionData;
}

export default function Question({ question }: QuestionProps) {
	return (
		<div className="top-0 m-2 flex h-full w-full flex-col rounded-xl border border-gray-700 bg-slate-900 shadow-sm shadow-slate-700/[.7]">
			<div className="p-14">
				<h3 className="text-2xl text-center font-bold text-white">{question.title}</h3>
				<h3 className="mt-10 text-xl font-bold text-gray-300">Description</h3>
				<p className="mt-2 text-gray-300">{question.description}</p>
				<p className="mt-4 text-gray-500">Points: {question.points}</p>
			</div>
		</div>
	);
}
