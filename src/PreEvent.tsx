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
    const dateStr = formatDateToCustomFormat();

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
            <div className="flex flex-col justify-center items-center h-screen gap-4">
                <h1 className="text-5xl font-bold text-white">PreEvent CTF</h1>
                <h1 className="text-2xl font-bold text-gray-300">{dateStr}</h1>
                <p className="text-sm text-gray-500 mt-4">Scroll down for questions</p>
            </div>
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

function formatDateToCustomFormat(): string {
  const currentDate: Date = new Date();
  const day: number = currentDate.getDate();
  const monthIndex: number = currentDate.getMonth();
  const year: number = currentDate.getFullYear();

  const suffix: string = getDaySuffix(day);

  const monthNames: string[] = [
    "January", "February", "March",
    "April", "May", "June", "July",
    "August", "September", "October",
    "November", "December"
  ];

  const monthName: string = monthNames[monthIndex];

  const formattedDate: string = `${day}${suffix} of ${monthName}, ${year}`;
  return formattedDate;
}

function getDaySuffix(day: number): string {
  if (day >= 11 && day <= 13) {
    return "th";
  }

  switch (day % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
}