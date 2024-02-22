import {useRouter} from 'next/router';
import React, {useState} from 'react';
import {QuizData} from "@/src/types/quiz";
import axiosClient from "@/src/utils/axios";
import {ParsedUrlQuery} from "node:querystring";
import {GetServerSideProps} from "next";

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
    const [responseMessage, setResponseMessage] = useState<string>(''); // Текст ответа от сервера
    const [responseStatus, setResponseStatus] = useState<'none' | 'success' | 'failed'>('none'); // Состояние ответа
    const router = useRouter();

    function handleAnswerSelect(questionIndex: number, answer: string) {
        setSelectedAnswers({...selectedAnswers, [questionIndex]: answer});
    }

    function submitAnswers() {
        axiosClient.post(`/quiz/${quiz.id}/answer`, {
            answers: Object.values(selectedAnswers),
        })
            .then((response) => {
                console.log('Ответ сервера:', response.data);
                setResponseMessage(`Ответ сохранен, число правильных ответов: ${response.data.split(":")[1]}`);
                setResponseStatus('success');
            })
            .catch((error) => {
                console.error('Ошибка при отправке ответов:', error);
                setResponseMessage('Произошла ошибка при отправке ответов.');
                setResponseStatus('failed');
            });
    }

    return (
        <div className="max-w-md mx-auto my-10 pl-4 pr-4">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {quiz.name}
            </h5>

            {responseStatus === "success" ? (
                <>
                    <h3 className="text-lg font-semibold mb-2">{responseMessage}</h3>
                    <button
                        className="mt-4 btn"
                        onClick={() => router.push('/')}
                    >
                        На главную
                    </button>
                </>
            ) : (
                <>
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
                            onClick={submitAnswers}
                        >
                            {responseStatus === "none" ? "Отправить ответы" : "Отправить снова"}
                        </button>
                        {responseStatus === "failed" && (
                            <p className="text-red-500 mt-2">{responseMessage}</p>
                        )}
                    </div>
                </>
            )}
        </div>
    );
}
