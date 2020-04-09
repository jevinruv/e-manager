import { ForumAnswer } from './forum-answer';

export class ForumQuestion {
    
    id: number;
    username: string;
    question: string;
    createdDate: Date;
    forumAnswers: ForumAnswer[] = [];

    constructor() {
        this.id = null;
        this.username = null;
        this.question = null;
        this.createdDate = null;
    }
}