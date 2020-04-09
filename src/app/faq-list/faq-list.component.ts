import { Component, OnInit } from '@angular/core';
import { ForumQuestionService } from '../services/forum-question.service';
import { ForumAnswerService } from '../services/forum-answer.service';

@Component({
  selector: 'app-faq-list',
  templateUrl: './faq-list.component.html',
  styleUrls: ['./faq-list.component.css']
})
export class FaqListComponent implements OnInit {

  forumQuestionList = [];
  filteredForumQuestionList = [];

  constructor(private forumQuestionService: ForumQuestionService ) { }

  ngOnInit(): void {

    this.forumQuestionService.getAll().subscribe(data => {
      console.log(data);
      this.filteredForumQuestionList = this.forumQuestionList = data;
    });
  }

  filter(query: string) {
    this.filteredForumQuestionList = (query) ?
      this.forumQuestionList.filter(forumQuestion => forumQuestion.question.toLowerCase().includes(query.toLocaleLowerCase())) : this.forumQuestionList;
  }
}
