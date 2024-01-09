import { useState } from "react";
import Dates from "./components/preevent/Dates";
import Question from "./components/preevent/Question";

export default function PreEvent() {
    const [date, setDate] = useState<number>(0);

	return (
		<div className="flex flex-col justify-center items-center h-screen">
            <h1 className="text-4xl font-bold">Pre-Event CTF</h1>
            <div className="h-5/6 w-5/6">
                {date === 0 ? (<Dates setDate={setDate} />) : (<Question date={date} />)}
            </div>
		</div>
	);
}
