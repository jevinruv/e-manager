import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EConsumption } from '../models/econsumption';
import { EconsumptionService } from '../services/econsumption.service';
import { CommonValueService } from '../services/common-value.service';
import { toInteger } from '@ng-bootstrap/ng-bootstrap/util/util';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-econsumptions-details',
  templateUrl: './econsumptions-details.component.html',
  styleUrls: ['./econsumptions-details.component.css']
})
export class EconsumptionsDetailsComponent implements OnInit {

  eConsumption: EConsumption = new EConsumption();
  isReadOnly = true;
  id: string;
  kwhCost: number;

  constructor(
    private route: ActivatedRoute,
    private eConsumptionService: EconsumptionService,
    private toastr: ToastrService,
    private commonValuesService: CommonValueService
  ) { }

  ngOnInit() {

    this.commonValuesService.get("kWh").subscribe(data => {
      console.log(data);
      this.kwhCost = parseInt(data.value);
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
   
    this.eConsumptionService.addOrUpdate(this.eConsumption).subscribe(data => {
      console.log(data);
      this.isReadOnly = true;
    });
  }

  edit() {
    this.isReadOnly = !this.isReadOnly;
  }

  onCPChanged(value) {

    if(value){
      // console.log(value);
      this.eConsumption.consumptionPlannedCost = value * this.kwhCost;
    }
  }

  onCAChanged(value) {

    if(value){
      // console.log(value);
      this.eConsumption.consumptionActualCost = value * this.kwhCost;
    }
  }

}
