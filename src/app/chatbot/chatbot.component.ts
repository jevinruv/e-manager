import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ChatbotDataService } from '../services/chatbot-data.service';
import { ChatBotData } from '../models/chatbot-data';
import { TokenService } from '../services/token.service';

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css']
})
export class ChatbotComponent implements OnInit {

  @ViewChild('scrollMe') private myScrollContainer: ElementRef;

  messages: any[] = []
  typedMessage: string;
  chatBotDataList: ChatBotData[] = [];
  username: string;
  user = { name: this.username, avatar: '/assets/002-young.png' };
  contact = { name: 'Bot', avatar: '/assets/001-robot.png' };

  constructor(
    private chatBotDataService: ChatbotDataService, 
    private tokenService: TokenService) { }

  ngAfterViewChecked() {
    this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
  }

  ngOnInit() {

    this.chatBotDataService.getAll().subscribe(data => {
      // console.log(data);
      this.chatBotDataList = data;

      this.initMessage();
    });

    this.username = this.tokenService.getEmail();
  }

  msg(user, contact, message, timestamp = Date.now()) {
    return {
      user,
      contact,
      message,
      timestamp,
    }
  }

  send(msg) {
    return this.msg(this.user, this.contact, msg)
  }
  recv(msg) {
    return this.msg(this.contact, this.user, msg)
  }

  initMessage() {

    let codeList = this.chatBotDataList.map(m => "/" + m.code);
    // console.log(codeList);
    let initMsg = "Hi " + this.username + " Please use the following codes for common questions." + " [ " + codeList + " ]";

    let message = this.recv(initMsg);
    this.messages.push(message);
  }

  sendMessage() {
    // console.log(this.typedMessage);
    if(!this.typedMessage) return;

    let message = this.send(this.typedMessage)
    this.messages.push(message);

    this.findAnswer(this.typedMessage);
  }

  findAnswer(typedMsg) {

    let answer = this.chatBotDataList.find(c => c.question.toLowerCase().includes(typedMsg.toLowerCase()) ||
      c.code.toLowerCase().includes(typedMsg.toLowerCase()));
    // console.log(answer);

    let messageToSend = "Sorry " + this.username + " I didn't understand your question";

    if (answer) {
      messageToSend = answer.answer;
    }

    let message = this.recv(messageToSend);
    this.messages.push(message);
    this.typedMessage = null;
  }
}
