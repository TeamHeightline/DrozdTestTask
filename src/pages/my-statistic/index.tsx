import React, { useEffect, useState } from 'react';

interface Statistic {
    id: string;
    attempts: number;
    correctAnswers: string[];

}
export default function MyStatistic()  {
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
                        <th className="py-3 px-2">ID Квиза</th>
                        <th className="py-3 px-2">Попыток</th>
                        <th className="py-3 px-2">Число правильных ответов</th>
                    </tr>
                    </thead>
                    <tbody className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    {statistics.map((stat) => (
                        <tr key={stat.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                            <td className="px-6 py-4">{stat.id}</td>
                            <td className="px-6 py-4">{stat.attempts}</td>
                            <td className="px-6 py-4">{stat.correctAnswers.join(', ')}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};