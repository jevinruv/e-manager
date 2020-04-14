import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';
import { EconsumptionService } from '../services/econsumption.service';
import { MilestoneService } from '../services/milestone.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  eConsumptionList = [];
  mileStoneList = [];

  today = new Date();
  groupedByMonth = [];
  groupedByYear = [];
  last6Months = [];

  last6MonthsKwhUsage: number = 0;
  currentYearKwhUsage: number = 0;
  last6MonthsKwhCost: number = 0;
  currentYearKwhCost: number = 0;

  currentYearMileStoneAchieved: number = 0;
  currentYearMileStoneTotal: number = 0;
  currentYearMileStonePercentage: number = 0;

  constructor(
    private eConsumptionService: EconsumptionService,
    private mileStoneService: MilestoneService
  ) { }

  ngOnInit(): void {

    this.eConsumptionService.getAll().subscribe(data => {
      // console.log(data);
      this.eConsumptionList = data;

      this.initConsumptionData();
    });

    this.mileStoneService.getAll().subscribe(data => {
      // console.log(data);
      this.mileStoneList = data;

      this.initMileStoneData();
    });

  }

  initMileStoneData() {
   
    let groupedMileStone = _.groupBy(this.mileStoneList, m => {
      return m.mileStoneDate.substring(0, 4);
    });

    this.currentYearMileStoneTotal = groupedMileStone[this.today.getFullYear()].length;

    groupedMileStone[this.today.getFullYear()].forEach(m => {
      if(m.status == "ACHIEVED") 
        this.currentYearMileStoneAchieved++;
    });

    this.currentYearMileStonePercentage = ((this.currentYearMileStoneAchieved / this.currentYearMileStoneTotal) * 100);
    // console.log(groupedMileStone);

  }


  initConsumptionData() {

    this.groupedByYear = _.groupBy(this.eConsumptionList, c => {
      return c.consumptionDate.substring(0, 4);
    });

    this.groupedByMonth = _.groupBy(this.eConsumptionList, c => {
      return c.consumptionDate.substring(0, 7);
    });

    //last 6 months
    var d;
    let m = []

    for (var i = 6; i > 0; i -= 1) {
      d = new Date(this.today.getFullYear(), this.today.getMonth() - i, 1);
      m.push(this.today.getFullYear() + "-" + (d.getMonth() + 1));
    }

    this.last6Months = this.eConsumptionList.filter(c => m.includes(c.consumptionDate.replace(/\b0/g, '')));


    // if (this.last6Months.length > 0)
      this.last6MonthsKwhUsage = this.last6Months.reduce((acc, curr) => acc + curr.consumptionActual, 0);
      this.last6MonthsKwhCost = this.last6Months.reduce((acc, curr) => acc + curr.consumptionActualCost, 0);

    // if (this.groupedByYear.length > 0)
      this.currentYearKwhUsage = this.groupedByYear[this.today.getFullYear()].reduce((acc, curr) => acc + curr.consumptionActual, 0);
      this.currentYearKwhCost = this.groupedByYear[this.today.getFullYear()].reduce((acc, curr) => acc + curr.consumptionActualCost, 0);


    // console.log(this.dashBoardData);
  }


  private getMonthName(month) {

    var months = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"];

    return months[month];
  }

}
