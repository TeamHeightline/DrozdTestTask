interface IAnswer {
    correct: number
}

export interface IUserStatistic {
    id: number,
    login: string,
    Answers: IAnswer[]
}

export interface IUserWithScore {
    id: number,
    login: string,
    score: number
}