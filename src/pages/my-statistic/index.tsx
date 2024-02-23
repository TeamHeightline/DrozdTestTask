import React, { useEffect, useState } from 'react';
import {GetServerSideProps} from "next";
import {Quiz} from "@/src/types/quiz";

interface Statistic {
    id: string;
    attempts: number;
    correctAnswers: string[];

}

type QuizzesProps = {
    quizzes: Quiz[];
};

export const getServerSideProps: GetServerSideProps<QuizzesProps> = async () => {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    const questionsUrl = "/quiz";
    const res = await fetch(baseUrl + questionsUrl);

    if (!res.ok) {
        throw new Error('Failed to fetch data');
    }
    const quizzes: Quiz[] = await res.json();

    return {props: {quizzes}};
};

export default function MyStatistic({quizzes}: QuizzesProps)  {
    const [statistics, setStatistics] = useState<Statistic[]>([]);

    useEffect(() => {
        // Чтение статистики из Local Storage
        const stats = JSON.parse(localStorage.getItem('quizStatistics')) || {};
        const formattedStats = Object.keys(stats).map((quizId) => ({
            id: quizId,
            attempts: stats[quizId].length,
            correctAnswers: stats[quizId],
        }));
        setStatistics(formattedStats);
    }, []);

    return (
        <div className="max-w-4xl mx-auto mt-10">
            <h2 className="text-2xl font-semibold text-center mb-4">Ваша статистика по квизам</h2>
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th className="py-3 px-2">Квиз</th>
                        <th className="py-3 px-2">Попыток</th>
                        <th className="py-3 px-2">Число правильных ответов</th>
                    </tr>
                    </thead>
                    <tbody className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    {statistics.map((stat) => {
                        const quiz = quizzes.find((item) => String(item.id) === stat.id)
                        return(
                        <tr key={stat.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                            <td className="px-6 py-4">{quiz?.name || ""}</td>
                            <td className="px-6 py-4">{stat.attempts}</td>
                            <td className="px-6 py-4">{stat.correctAnswers.join(', ')}</td>
                        </tr>
                    )}
                    )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};