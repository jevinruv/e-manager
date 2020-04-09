import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ForumQuestion } from '../models/forum-question';

@Injectable({
  providedIn: 'root'
})
export class ForumQuestionService {

  API_URL = "/api/forum-questions";

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<ForumQuestion[]>(this.API_URL);
  }

  get(id) {
    return this.http.get<ForumQuestion>(this.API_URL + `/${id}`);
  }

  addOrUpdate(obj) {
    return this.http.post<ForumQuestion>(this.API_URL, obj);
  }

}
