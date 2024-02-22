export type Quiz = {
    name: string;
    id: string
};

export type Answers = string[]

export type Question = {
    question: string;
    answers: Answers;
}

export type QuizData = Quiz & {
    questions: Question[];
}
