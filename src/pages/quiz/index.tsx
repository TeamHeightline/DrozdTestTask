import {GetServerSideProps} from 'next';
import React from 'react';
import {Quiz} from "@/src/types/quiz";
import Link from "next/link";
import ArrowIcon from "@/src/components/icons/arrow";

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

export default function Quizzes({quizzes}: QuizzesProps) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 m-4">
            {quizzes.map((quiz) => (
                    <div key={quiz.id}
                         className="max-w-max md:max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                        <Link href={"/quiz/" + quiz.id}>
                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                {quiz.name}
                            </h5>
                        </Link>

                        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                            Здесь должно быть описание викторины
                            Здесь должно быть описание викторины
                            Здесь должно быть описание викторины
                        </p>
                        <Link href={"/quiz/" + quiz.id}
                              className="btn">
                            Перейти
                            <ArrowIcon/>
                        </Link>
                    </div>
                )
            )}
        </div>
    );
};


