import { Injectable } from '@angular/core';
import { MileStone } from '../models/milestone';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MilestoneService {

  API_URL = "/api/milestones";

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<MileStone[]>(this.API_URL);
  }

  get(id) {
    return this.http.get<MileStone>(this.API_URL + `/${id}`);
  }

  addOrUpdate(obj) {
    return this.http.post<MileStone>(this.API_URL, obj);
  }

  deleteR(id) {
    return this.http.delete(this.API_URL + `/${id}`);
  }
}
