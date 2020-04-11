import { Component, OnInit } from '@angular/core';
import { CustomerCategoryService } from '../services/customer-category.service';

@Component({
  selector: 'app-customer-category-list',
  templateUrl: './customer-category-list.component.html',
  styleUrls: ['./customer-category-list.component.css']
})
export class CustomerCategoryListComponent implements OnInit {

  customerCategoryList = [];
  filteredCustomerCategoryList = [];

  constructor(private customerCategoryService: CustomerCategoryService ) { }

  ngOnInit(): void {

    this.customerCategoryService.getAll().subscribe(data => {
      console.log(data);
      this.filteredCustomerCategoryList = this.customerCategoryList = data;
    });
  }

  filter(query: string) {
    this.filteredCustomerCategoryList = (query) ?
      this.customerCategoryList.filter(customerCategory => customerCategory.name.toLowerCase().includes(query.toLocaleLowerCase())) : this.customerCategoryList;
  }

}
