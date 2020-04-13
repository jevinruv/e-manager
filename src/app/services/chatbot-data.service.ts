import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ChatBotData } from '../models/chatbot-data';

@Injectable({
  providedIn: 'root'
})
export class ChatbotDataService {

  API_URL = "/api/chat-bot";

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<ChatBotData[]>(this.API_URL);
  }

  get(id) {
    return this.http.get<ChatBotData>(this.API_URL + `/${id}`);
  }

  addOrUpdate(obj) {
    return this.http.post<ChatBotData>(this.API_URL, obj);
  }

  deleteR(id) {
    return this.http.delete(this.API_URL + `/${id}`);
  }
}
