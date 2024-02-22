import {useRouter} from 'next/router';
import React, {useState} from 'react';
import {Quiz, QuizData} from "@/src/types/quiz";
import {GetServerSideProps} from "next";
import {ParsedUrlQuery} from "node:querystring";

interface QuizzesProps {
    quiz: QuizData;
}

interface IParams extends ParsedUrlQuery {
    id: string;
}

export const getServerSideProps: GetServerSideProps<QuizzesProps> = async (context) => {
    const {id} = context.params as IParams
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    const quizUrl = `/quiz/${id}`;
    const res = await fetch(baseUrl + quizUrl);

    if (!res.ok) {
        return {
            notFound: true,
        };
    }
    const quiz: QuizData = await res.json();
    
    return {props: {quiz}};
};

export default function QuizPage({quiz}: QuizzesProps) {
    const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: string }>({});


    // Обработчик выбора ответа
    function handleAnswerSelect(questionIndex: number, answer: string) {
        setSelectedAnswers({...selectedAnswers, [questionIndex]: answer});
    }

    return (
        <div className="max-w-md mx-auto my-10">
            {quiz.questions.map((item, index) => (
                <div key={index} className="mb-5">
                    <h3 className="text-lg font-semibold mb-2">{item.question}</h3>
                    <div className="flex flex-col">
                        {item.answers.map((answer) => (
                            <label key={answer} className="inline-flex items-center mt-3">
                                <input
                                    type="radio"
                                    name={`question-${index}`}
                                    className="form-radio h-5 w-5 text-gray-700 dark:text-gray-400 bg-transparent  dark:bg-gray-900"
                                    onChange={() => handleAnswerSelect(index, answer)}
                                    checked={selectedAnswers[index] === answer}
                                />
                                <span className="ml-2 text-gray-700 dark:text-gray-300">{answer}</span>
                            </label>
                        ))}
                    </div>
                </div>
            ))}

            <div className="mt-6">
                <button
                    className="btn"
                    onClick={() => console.log(selectedAnswers)}
                >
                    Отправить ответы
                </button>
            </div>
        </div>
    );
};

