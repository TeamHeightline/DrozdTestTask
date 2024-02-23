import {GetServerSideProps} from "next";
import {IUserStatistic, IUserWithScore} from "@/src/types/user-statistic";
import {useEffect, useState} from "react";

type QuizzesProps = {
    usersScore: IUserWithScore[];
};

export const getServerSideProps: GetServerSideProps<QuizzesProps> = async () => {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    const questionsUrl = "/get-users";
    const res = await fetch(baseUrl + questionsUrl);

    if (!res.ok) {
        throw new Error('Failed to fetch data');
    }
    const statistics: IUserStatistic[] = await res.json();

    const usersWithTotalQuizScore = statistics.map((user) => {
        const score = user.Answers
            .map((answer) => answer.correct)
            .reduce((sum, a) => sum + a, 0)
        return ({
            id: user.id,
            login: user.login,
            score
        })
    })
    const sorted = usersWithTotalQuizScore.sort((a, b) => b.score - a.score)

    return {props: {usersScore: sorted}};
};


export default function AllStatistic({usersScore}: QuizzesProps) {
    const [userWithMeScore, setUserWithMeScore] = useState<IUserWithScore[]>([]);

    useEffect(() => {
        // Получение суммы моих очков из local storage и добавление в общие результаты
        // @ts-ignore
        const stats = JSON.parse(localStorage.getItem('quizStatistics')) || {};
        let myScore = 0
        Object.keys(stats).map((quizId) => {
            myScore += stats[quizId]
                .reduce((sum: number, a: number) => sum + a, 0)
        });
        const meRow: IUserWithScore = {
            id: -1,
            login: "Вы",
            score: myScore
        }

        const usersWithMe = [...usersScore, meRow]
            .sort((a, b) => b.score - a.score)

        setUserWithMeScore(usersWithMe);
    }, []);


    return (
        <div>
            <div className="max-w-4xl mx-auto mt-10">
                <h2 className="text-2xl font-semibold text-center mb-4">Лидеры по числу правильных ответов</h2>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead
                            className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th className="py-3 px-2">Логин</th>
                            <th className="py-3 px-2">Общее количество правильных ответов</th>
                        </tr>
                        </thead>
                        <tbody className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        {userWithMeScore.map((user, index) => (
                            <tr key={user.id} className={`bg-white border-b dark:border-gray-700 
                            ${user.id === -1 ? "dark:bg-emerald-800 bg-emerald-300" : "dark:bg-gray-800 bg-white"}`}>
                                <td className="px-6 py-4">{user.login}</td>
                                <td className="px-6 py-4">{user.score}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}