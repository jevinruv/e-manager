import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Content } from '../models/content';

@Injectable({
  providedIn: 'root'
})
export class ContentService {

  API_URL = "/api/content";

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<Content[]>(this.API_URL);
  }

  get(id) {
    return this.http.get<Content>(this.API_URL + `/${id}`);
  }

  addOrUpdate(obj) {
    return this.http.post<Content>(this.API_URL, obj);
  }

}
