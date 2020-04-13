import { Component, OnInit } from '@angular/core';
import { ChatbotDataService } from '../services/chatbot-data.service';

@Component({
  selector: 'app-chatbot-list',
  templateUrl: './chatbot-list.component.html',
  styleUrls: ['./chatbot-list.component.css']
})
export class ChatbotListComponent implements OnInit {

  chatBotDataList = [];
  filteredChatBotDataList = [];

  constructor(private chatbotDataService: ChatbotDataService ) { }

  ngOnInit(): void {

    this.chatbotDataService.getAll().subscribe(data => {
      console.log(data);
      this.filteredChatBotDataList = this.chatBotDataList = data;
    });
  }

  filter(query: string) {
    this.filteredChatBotDataList = (query) ?
      this.chatBotDataList.filter(chatBotData => chatBotData.code.toLowerCase().includes(query.toLowerCase())) : this.chatBotDataList;
  }

}
