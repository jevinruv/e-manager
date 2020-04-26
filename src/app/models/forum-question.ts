import { ForumAnswer } from './forum-answer';

export class ForumQuestion {
    
    id: number;
    email: string;
    question: string;
    createdDate: Date;
    forumAnswers: ForumAnswer[] = [];

    constructor() {
        this.id = null;
        this.email = null;
        this.question = null;
        this.createdDate = null;
    }
}