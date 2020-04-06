import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EConsumption } from '../models/econsumption';

@Injectable({
  providedIn: 'root'
})
export class EconsumptionService {

  API_URL = "/api/econsumptions";

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<EConsumption[]>(this.API_URL);
  }

  get(id) {
    return this.http.get<EConsumption>(this.API_URL + `/${id}`);
  }

  addOrUpdate(user) {
    return this.http.post<EConsumption>(this.API_URL, user);
  }

}
