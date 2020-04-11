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
      this.filteredEConsumptionList = this.eConsumptionList.filter(e => e.consumptionActualCost == null);
    }
    else if (category == 'completed') {
      this.filteredEConsumptionList = this.eConsumptionList.filter(e => e.consumptionActualCost != null);
    }
    else {
      this.filteredEConsumptionList = this.eConsumptionList;
    }

  }

  

  // private prepareCategories(category) {

  //   let groupedResults = _(this.eConsumptionList)
  //     .map(item => {

  //       let st = item["consumptionDate"];
  //       let pattern = /(\d{2})\-(\d{2})\-(\d{4})/;
  //       let dt = new Date(st.replace(pattern,'$3-$2-$1'));
  //       let consumptionDate = null;

  //       switch(category){
  //         case 'daily':
  //           consumptionDate = dt.getDate();
  //         break;
  //         case 'weekly':
  //           consumptionDate = item["weekNo"];
  //         break;
  //         case 'monthly':
  //           consumptionDate = this.getMonthName(dt.getMonth());
  //         break;
  //         case 'annually':
  //           consumptionDate = dt.getFullYear();
  //         break;
  //       }

  //       return {
  //                 date: consumptionDate + " - " + dt.getFullYear(),
  //                 consumption: parseInt(item["consumption"])
  //               }
  //     })
  //     .groupBy("date")
  //     .mapValues(item => {
  //         // console.log(item);
  //          return _.sumBy(item, 'consumption');
  //      })
  //     .value()

  //     console.log(groupedResults);
  //     this.filteredEConsumptionList = groupedResults;
  //     // console.log(this.filteredEConsumptionList);

  // }

  // private getMonthName(month){

  //   var months = [ "January", "February", "March", "April", "May", "June", 
  //          "July", "August", "September", "October", "November", "December" ];

  //   return months[month];
  // }


}
