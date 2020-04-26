import { ForumQuestion } from './forum-question';

export class ForumAnswer {
    
    id: number;
    email: string;
    answer: string;
    createdDate: Date;
    forumQuestion: ForumQuestion = new ForumQuestion();

    constructor() {
        this.id = null;
        this.email = null;
        this.answer = null;
        this.createdDate = null;
    }
}