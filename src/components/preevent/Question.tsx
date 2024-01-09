import axios from "axios";
import { useEffect, useState } from "react";

export interface QuestionData {
    question: string;
    points: number;
}

export default function Question({ date }: { date: number }) {
    const [question, setQuestion] = useState<QuestionData | null>(null);
    
    useEffect(() => {
        axios.get(`/ctf/question/${date}`).then((res: { data: QuestionData }) => {
            setQuestion(res.data);
        }).catch(() => {});
    });

    if (!question)
        return (<>Loading...</>);

    return (<></>);
}