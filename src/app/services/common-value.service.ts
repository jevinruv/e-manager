import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonValue } from '../models/common-value';

@Injectable({
  providedIn: 'root'
})
export class CommonValueService {

  API_URL = "/api/common-values";

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<CommonValue[]>(this.API_URL);
  }

  get(id) {
    return this.http.get<CommonValue>(this.API_URL + `/${id}`);
  }

  getByKey(key) {
    return this.http.get<CommonValue>(this.API_URL + `/key/${key}`);
  }

  addOrUpdate(obj) {
    return this.http.post<CommonValue>(this.API_URL, obj);
  }

  deleteR(id) {
    return this.http.delete(this.API_URL + `/${id}`);
  }

}
