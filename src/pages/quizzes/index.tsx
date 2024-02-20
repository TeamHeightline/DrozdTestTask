// Импорт зависимостей
import {GetServerSideProps, InferGetServerSidePropsType} from 'next';
import Typography from '@mui/material/Typography';
import React from 'react';
import {Quiz} from "@/src/types/quiz";
import QuizCard from "@/src/components/quiz-card";

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

// Компонент страницы, использующий загруженные данные
const Quizzes: React.FC<InferGetServerSidePropsType<typeof getServerSideProps>> = ({quizzes}) => {
    console.log(quizzes)
    return (
        <div class="grid grid-cols-4 gap-4 m-4">
            {quizzes.map((quiz, index) => (
                <QuizCard key={index} quiz={quiz}/>
            ))}
        </div>
    );
};

export default Quizzes;
