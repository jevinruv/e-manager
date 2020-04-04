import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Prediction } from '../models/prediction';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PredictionService {

  // API_URL = environment.baseURL + "/predictions";
  API_URL = "/api/predictions";

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<Prediction[]>(this.API_URL);
  }

  get(id) {
    return this.http.get<Prediction>(this.API_URL + `/${id}`);
  }

  predict(prediction) {
    return this.http.post<Prediction>(this.API_URL + "/predict", prediction);
  }

}
