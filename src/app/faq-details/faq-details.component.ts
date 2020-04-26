import { Component, OnInit } from '@angular/core';
import { ForumQuestion } from '../models/forum-question';
import { TokenService } from '../services/token.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { ForumQuestionService } from '../services/forum-question.service';
import { ForumAnswerService } from '../services/forum-answer.service';
import { ForumAnswer } from '../models/forum-answer';

@Component({
  selector: 'app-faq-details',
  templateUrl: './faq-details.component.html',
  styleUrls: ['./faq-details.component.css']
})
export class FaqDetailsComponent implements OnInit {

  forumQuestion: ForumQuestion = new ForumQuestion();
  forumAnswer: ForumAnswer = new ForumAnswer();
  isReadOnly = true;
  id: string;

  constructor(
    private route: ActivatedRoute,
    private forumQuestionService: ForumQuestionService,
    private forumAnswerService: ForumAnswerService,
    private tokenService: TokenService,
    private toastr: ToastrService,
    private router: Router,
  ) { }

  ngOnInit() {

    this.id = this.route.snapshot.paramMap.get('id');
   
    if (this.id) {
      this.forumQuestionService.get(this.id).subscribe(data => {
        console.log(data);
        this.forumQuestion = data;
      });
    }
    else {
      this.forumQuestion.email = this.tokenService.getEmail();
      this.isReadOnly = false;
    }
  }

  onSubmitQuestion() {

    delete this.forumQuestion.createdDate;

    this.forumQuestionService.addOrUpdate(this.forumQuestion).subscribe(data => {
      // console.log(data);
      this.isReadOnly = true;
    });
  }

  onSubmitAnswer() {

    delete this.forumAnswer.createdDate;
    this.forumAnswer.email = this.tokenService.getEmail();
    this.forumAnswer.forumQuestion.id = this.forumQuestion.id;

    // console.log(this.forumAnswer);

    this.forumAnswerService.addOrUpdate(this.forumAnswer).subscribe(data => {
      // console.log(data);
      this.forumAnswer = data;
      this.forumQuestion.forumAnswers.push(this.forumAnswer);
      this.forumAnswer = new ForumAnswer();
    });

  }

  edit() {
    this.isReadOnly = !this.isReadOnly;
  }

  isEditEnabled(){
    return this.tokenService.isAdmin() || this.tokenService.getEmail() == this.forumQuestion.email
  }

}
