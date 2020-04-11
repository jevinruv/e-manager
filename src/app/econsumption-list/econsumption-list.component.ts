import { Component, OnInit } from '@angular/core';
import { EconsumptionService } from '../services/econsumption.service';
import { ActivatedRoute } from '@angular/router';
// import * as _ from 'lodash';

@Component({
  selector: 'app-econsumption-list',
  templateUrl: './econsumption-list.component.html',
  styleUrls: ['./econsumption-list.component.css']
})
export class EconsumptionListComponent implements OnInit {

  eConsumptionList = [];
  filteredEConsumptionList = [];
  selectedCategory: string;

  constructor(
    private eConsumptionService: EconsumptionService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {

    this.eConsumptionService.getAll().subscribe(data => {
      console.log(data);
      this.filteredEConsumptionList = this.eConsumptionList = data;
      this.viewByCategory();
    });

    this.viewByCategory();

  }

  viewByCategory() {

    this.route.queryParamMap.subscribe(params => {
      this.selectedCategory = params.get('category');

      // console.log(this.selectedCategory);
      this.sorter(this.selectedCategory)

    });

  }

  private sorter(category) {

    if (category == 'planned') {
      this.filteredEConsumptionList = this.eConsumptionList.filter(e => e.consumptionActualCost == 0);
    }
    else if (category == 'completed') {
      this.filteredEConsumptionList = this.eConsumptionList.filter(e => e.consumptionActualCost != 0);
    }
    else {
      this.filteredEConsumptionList = this.eConsumptionList;
    }

  }

}
