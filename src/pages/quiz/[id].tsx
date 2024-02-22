import {useRouter} from 'next/router';
import React from 'react';
import {Quiz} from "@/src/types/quiz";
import {GetServerSideProps} from "next";
import {ParsedUrlQuery} from "node:querystring";

interface QuizzesProps {
    quiz: Quiz;
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
    const quiz: Quiz = await res.json();
    console.log(quiz)

    return {props: {quiz}};
};

export default function QuizPage({quiz}: QuizzesProps) {
    const router = useRouter();
    const {id} = router.query;


    return (
        <div>
            <h1>Страница викторины</h1>
            <p>Идентификатор викторины: {id}</p>

        </div>
    );
};

