import { Injectable } from '@angular/core';
import { ForumAnswer } from '../models/forum-answer';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ForumAnswerService {

  API_URL = "/api/forum-answers";

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<ForumAnswer[]>(this.API_URL);
  }

  get(id) {
    return this.http.get<ForumAnswer>(this.API_URL + `/${id}`);
  }

  addOrUpdate(obj) {
    return this.http.post<ForumAnswer>(this.API_URL, obj);
  }

}
