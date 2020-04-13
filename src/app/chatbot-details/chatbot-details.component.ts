import { Component, OnInit } from '@angular/core';
import { ChatBotData } from '../models/chatbot-data';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ChatbotDataService } from '../services/chatbot-data.service';

@Component({
  selector: 'app-chatbot-details',
  templateUrl: './chatbot-details.component.html',
  styleUrls: ['./chatbot-details.component.css']
})
export class ChatbotDetailsComponent implements OnInit {

  chatBotData: ChatBotData = new ChatBotData();

  isReadOnly = true;
  id: string;

  constructor(
    private route: ActivatedRoute,
    private chatBotDataService: ChatbotDataService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit() {

    this.id = this.route.snapshot.paramMap.get('id');
   
    if (this.id) {
      this.chatBotDataService.get(this.id).subscribe(data => {
        console.log(data);
        this.chatBotData = data;
      });
    }
    else {
      this.isReadOnly = false;
    }
  }

  onSubmit() {

    this.chatBotDataService.addOrUpdate(this.chatBotData).subscribe(data => {
      // console.log(data);
      this.isReadOnly = true;
    });
  }

  edit() {
    this.isReadOnly = !this.isReadOnly;
  }

  deleteRecord(){

    this.chatBotDataService.deleteR(this.chatBotData.id).subscribe(data => {
      this.router.navigate(['/chatbot-data']);
    });
  }

}
