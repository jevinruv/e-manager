import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';
import { EconsumptionService } from '../services/econsumption.service';
import { MilestoneService } from '../services/milestone.service';
import { EConsumption } from '../models/econsumption';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  eConsumptionList = [];
  mileStoneList = [];

  today = new Date();
  groupedByYear = [];
  last6Months = [];

  last6MonthsKwhUsage: number = 0;
  currentYearKwhUsage: number = 0;
  last6MonthsKwhCost: number = 0;
  currentYearKwhCost: number = 0;

  currentYearMileStoneAchieved: number = 0;
  currentYearMileStoneTotal: number = 0;
  currentYearMileStonePercentage: number = 0;

  currentMonthEconsumption: EConsumption = new EConsumption();

  graphConsumptionData: any[];
  graphCostData: any[];
  view: any[] = [900, 400];

  // options
  legend: boolean = true;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Date';
  yAxisConsumptionLabel: string = 'Consumption (kWh)';
  yAxisCostLabel: string = 'Cost (LKR)';
  timeline: boolean = true;

  constructor(
    private eConsumptionService: EconsumptionService,
    private mileStoneService: MilestoneService
  ) { }

  ngOnInit(): void {

    this.eConsumptionService.getAll().subscribe(data => {
      // console.log(data);
      this.eConsumptionList = data;

      this.initConsumptionData();
      this.initGraph();
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
      if (m.status == "ACHIEVED")
        this.currentYearMileStoneAchieved++;
    });

    this.currentYearMileStonePercentage = ((this.currentYearMileStoneAchieved / this.currentYearMileStoneTotal) * 100);
    // console.log(groupedMileStone);

  }

  initConsumptionData() {

    this.groupedByYear = _.groupBy(this.eConsumptionList, c => {
      return c.consumptionDate.substring(0, 4);
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

    this.currentMonthEconsumption = this.groupedByYear[this.today.getFullYear()].find(c => 
      c.consumptionDate.replace(/\b0/g, '') == this.today.getFullYear() + "-" + (this.today.getMonth() + 1)
    );

    // console.log(this.currentMonthEconsumption);
  }

  initGraph() {

    let actual = this.last6Months.map(o => ({ value: o.consumptionActualCost, name: o.consumptionDate }));
    let planned = this.last6Months.map(o => ({ value: o.consumptionPlannedCost, name: o.consumptionDate }));

    this.graphCostData = [
      { name: "Actual", series: actual },
      { name: "Planned", series: planned },
    ];

    let actualConsumption = this.last6Months.map(o => ({ value: o.consumptionActual, name: o.consumptionDate }));
    let plannedConsumption = this.last6Months.map(o => ({ value: o.consumptionPlanned, name: o.consumptionDate }));

    this.graphConsumptionData = [
      { name: "Actual", series: actualConsumption },
      { name: "Planned", series: plannedConsumption },
    ];

    // console.log(this.graphData);

  }

}
