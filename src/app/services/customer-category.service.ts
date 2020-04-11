import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CustomerCategory } from '../models/customer-category';

@Injectable({
  providedIn: 'root'
})
export class CustomerCategoryService {

  API_URL = "/api/customer-categories";

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<CustomerCategory[]>(this.API_URL);
  }

  get(id) {
    return this.http.get<CustomerCategory>(this.API_URL + `/${id}`);
  }

  addOrUpdate(customer) {
    return this.http.post<CustomerCategory>(this.API_URL, customer);
  }

  deleteR(id) {
    return this.http.delete(this.API_URL + `/${id}`);
  }

}
