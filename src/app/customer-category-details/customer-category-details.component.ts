import { Component, OnInit } from '@angular/core';
import { CustomerCategory } from '../models/customer-category';
import { CustomerCategoryService } from '../services/customer-category.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CustomerCategoryPrice } from '../models/customer-category-price';

@Component({
  selector: 'app-customer-category-details',
  templateUrl: './customer-category-details.component.html',
  styleUrls: ['./customer-category-details.component.css']
})
export class CustomerCategoryDetailsComponent implements OnInit {

  customerCategory: CustomerCategory = new CustomerCategory();
  customerCategoryPriceOne: CustomerCategoryPrice = new CustomerCategoryPrice();
  customerCategoryPriceTwo: CustomerCategoryPrice = new CustomerCategoryPrice();
  isReadOnly = true;
  id: string;

  constructor(
    private route: ActivatedRoute,
    private customerCategoryService: CustomerCategoryService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit() {

    this.id = this.route.snapshot.paramMap.get('id');
   
    this.customerCategoryPriceOne.consumptionRangeStart = 0;
    this.customerCategoryPriceTwo.consumptionRangeStop = Number.MAX_VALUE;

    if (this.id) {
      this.customerCategoryService.get(this.id).subscribe(data => {
        console.log(data);
        this.customerCategory = data;

        this.customerCategoryPriceOne = this.customerCategory.customerCategoryPrices.find(o => o.rangeId == 1);
        this.customerCategoryPriceTwo = this.customerCategory.customerCategoryPrices.find(o => o.rangeId == 2);
      });

    }
    else {
      this.isReadOnly = false;
    }

  }

  onSubmit() {
   
    delete this.customerCategory.createdDate;
    delete this.customerCategoryPriceOne.reviewedDate;
    delete this.customerCategoryPriceTwo.reviewedDate;
    this.customerCategoryPriceOne.rangeId = 1;
    this.customerCategoryPriceTwo.rangeId = 2;
    this.customerCategory.customerCategoryPrices = [];
    this.customerCategory.customerCategoryPrices.push(this.customerCategoryPriceOne, this.customerCategoryPriceTwo);

    console.log(this.customerCategory);

    this.customerCategoryService.addOrUpdate(this.customerCategory).subscribe(data => {
      console.log(data);
      this.isReadOnly = true;
    });
  }

  edit() {
    this.isReadOnly = !this.isReadOnly;
  }

  onRangeChanged(value) {

    if(value){
      // console.log(value);
      this.customerCategoryPriceTwo.consumptionRangeStart = this.customerCategoryPriceOne.consumptionRangeStop;
    }
  }

  deleteRecord(){

    this.customerCategoryService.deleteR(this.customerCategory.id).subscribe(data => {
      this.router.navigate(['/customer-category']);
    });
  }

}
