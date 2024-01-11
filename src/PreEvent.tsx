import Question, { QuestionData } from "./components/preevent/Question";
import Navbar from "./components/Navbar/Navbar";
import { useEffect, useState } from "react";
import axios from "axios";

export default function PreEvent() {
	const [questions, setQuestions] = useState<QuestionData[]>([
		{
			title: "reuben",
			description: "help me with this",
			points: 200,
		},
        {
            title: "reuben 2",
            description: "send help please",
            points: 300,
        }
	]);

	useEffect(() => {
		axios
			.get("http://localhost:5000/api/questions")
			.then((res) => {
				setQuestions(res.data as QuestionData[]);
			})
			.catch(() => {});
	});

	return (
		<div>
			<Navbar />
			{questions.map((question, i) => (
				<div key={i} className="flex flex-col h-screen items-center justify-center">
					<div className="h-5/6 w-5/6">
						<Question question={question} index={i}/>
					</div>
				</div>
			))}
		</div>
	);
}
