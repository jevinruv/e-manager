import { Component, OnInit } from '@angular/core';
import { EConsumption } from '../models/econsumption';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EconsumptionService } from '../services/econsumption.service';
import { CustomerCategoryService } from '../services/customer-category.service';
import { CustomerCategory } from '../models/customer-category';

@Component({
  selector: 'app-consumption-calculator',
  templateUrl: './consumption-calculator.component.html',
  styleUrls: ['./consumption-calculator.component.css']
})
export class ConsumptionCalculatorComponent implements OnInit {

  eConsumption: EConsumption = new EConsumption();
  customerCategoryList: CustomerCategory[] = [];
  selectedCustomerCategory;
  isReadOnly = true;
  id: string;

  constructor(
    private eConsumptionService: EconsumptionService,
    private customerCategoryService: CustomerCategoryService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {

    this.customerCategoryService.getAll().subscribe(data => {
      console.log(data);
      this.customerCategoryList = data;
    });

    this.id = this.route.snapshot.paramMap.get('id');

    if (this.id) {
      this.eConsumptionService.get(this.id).subscribe(data => {
        console.log(data);
        this.eConsumption = data;
      });
    }
    else {
      this.isReadOnly = false;
    }
  }

  onSubmit() {

    this.eConsumptionService.addOrUpdate(this.eConsumption).subscribe(() => {
      // console.log(data);
      this.isReadOnly = true;
    });
  }

  edit() {
    this.isReadOnly = !this.isReadOnly;
  }

  getCost() {

    console.log();

    let calc = {
      customerCategoryId: this.selectedCustomerCategory,
      consumptionValue: this.eConsumption.consumptionPlanned
    };

    console.log(calc);

    this.eConsumptionService.calculateConsumption(calc).subscribe(data => {
      console.log(data);
      this.eConsumption.consumptionPlannedCost = parseInt(data.toString());
    });

    this.toastr.success("Calculation Submitted");
  }


}
