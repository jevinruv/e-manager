import { ForumQuestion } from './forum-question';

export class ForumAnswer {
    
    id: number;
    username: string;
    answer: string;
    createdDate: Date;
    forumQuestion: ForumQuestion = new ForumQuestion();

    constructor() {
        this.id = null;
        this.username = null;
        this.answer = null;
        this.createdDate = null;
    }
}