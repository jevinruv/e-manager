import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EConsumption } from '../models/econsumption';
import { EconsumptionService } from '../services/econsumption.service';
import { CustomerCategory } from '../models/customer-category';
import { CustomerCategoryService } from '../services/customer-category.service';
import * as jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { CustomerCategoryPrice } from '../models/customer-category-price';

@Component({
  selector: 'app-econsumptions-details',
  templateUrl: './econsumptions-details.component.html',
  styleUrls: ['./econsumptions-details.component.css']
})
export class EconsumptionsDetailsComponent implements OnInit {

  eConsumption: EConsumption = new EConsumption();
  isReadOnly = true;
  id: string;
  customerCategoryList: CustomerCategory[] = [];
  eConsumptionList: EConsumption[] = [];
  selectedCustomerCategory: CustomerCategory = new CustomerCategory();
  customerCategoryPrice: CustomerCategoryPrice = new CustomerCategoryPrice();

  graphCostData: any[];
  graphConsumptionData: any[];
  view: any[] = [700, 400];

  // options
  legend: boolean = true;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Date';
  yAxisLabelCost: string = 'Cost (LKR)';
  yAxisLabelConsumption: string = 'Consumption (kWh)';
  timeline: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private eConsumptionService: EconsumptionService,
    private customerCategoryService: CustomerCategoryService,
    private toastr: ToastrService) { }

  ngOnInit() {

    this.customerCategoryService.getAll().subscribe(data => {
      // console.log(data);
      this.customerCategoryList = data;
    });

    this.id = this.route.snapshot.paramMap.get('id');

    if (this.id) {
      this.eConsumptionService.get(this.id).subscribe(data => {
        // console.log(data);
        this.eConsumption = data;
      });

      this.eConsumptionService.getAll().subscribe(data => {
        // console.log(data);
        this.eConsumptionList = data;
      });

    }
    else {
      this.isReadOnly = false;
    }

  }

  onSubmit() {

    delete this.eConsumption.consumptionPlannedDate;

    // console.log(this.eConsumption);

    this.eConsumptionService.addOrUpdate(this.eConsumption).subscribe(data => {

      // console.log(data);

      if (data) {
        this.isReadOnly = true;
        this.validateConsumptions();
      }
      else {
        this.toastr.error("Already Exists");
      }
    });
  }

  edit() {
    this.isReadOnly = !this.isReadOnly;
  }

  onCustomerCategorySelected(e) {
    // console.log(e);
    this.selectedCustomerCategory = e;
  }

  getCost() {

    let calc = {
      customerCategoryId: this.selectedCustomerCategory.id,
      consumptionValue: this.eConsumption.consumptionActual
    };

    console.log(calc);

    this.eConsumptionService.calculateConsumption(calc).subscribe(data => {
      console.log(data);
      this.customerCategoryPrice = data["customerCategoryPrice"];
      this.eConsumption.consumptionActualCost = parseInt(data["total"]);
    });

    this.toastr.success("Calculation Submitted");
  }

  viewGraph() {

    let year = this.eConsumption.consumptionDate.toString().split("-")[0];

    this.eConsumptionList = this.eConsumptionList.filter(o => o.consumptionDate.toString().split("-")[0] == year);
    // console.log(this.eConsumptionList);

    let actualCost = this.eConsumptionList.map(o => ({ value: o.consumptionActualCost, name: o.consumptionDate }));
    let plannedCost = this.eConsumptionList.map(o => ({ value: o.consumptionPlannedCost, name: o.consumptionDate }));

    let actualConsumption = this.eConsumptionList.map(o => ({ value: o.consumptionActual, name: o.consumptionDate }));
    let plannedConsumption = this.eConsumptionList.map(o => ({ value: o.consumptionPlanned, name: o.consumptionDate }));


    this.graphCostData = [
      { name: "Actual", series: actualCost },
      { name: "Planned", series: plannedCost },
    ];

    this.graphConsumptionData = [
      { name: "Actual", series: actualConsumption },
      { name: "Planned", series: plannedConsumption },
    ];

    // console.log(this.graphData);

    // this.validateConsumptions();
  }

  validateConsumptions() {

    if (this.eConsumption.consumptionActualCost > this.eConsumption.consumptionPlannedCost) {

      let difference = this.eConsumption.consumptionActualCost - this.eConsumption.consumptionPlannedCost;
      this.toastr.warning("Consumption is higher by LKR " + difference);
      // let report = this.printReport("generate");
      // this.sendEmail(report);
    }
    else {
      let difference = this.eConsumption.consumptionPlannedCost - this.eConsumption.consumptionActualCost;
      this.toastr.success("Consumption is Saved by LKR " + difference);
    }
  }

  async printReport() {

    let title = "E-Consumption #" + this.eConsumption.id.toString() + " For " + this.eConsumption.consumptionDate.toString();
    var consumptionDetails = document.getElementById('consumptionDetails');
    var graphCost = document.getElementById('graphCost');
    var graphConsumption = document.getElementById('graphConsumption');
    let consumptionDataURL;
    let graphCostDataURL;
    let graphConsumptionDataURL;

    var doc = new jsPDF({
      orientation: 'landscape',
      unit: 'in',
      format: 'a4'
    });

    await html2canvas(consumptionDetails).then(canvas => consumptionDataURL = canvas.toDataURL('image/png'));
    await html2canvas(graphCost).then(canvas => graphCostDataURL = canvas.toDataURL('image/png'));
    await html2canvas(graphConsumption).then(canvas => graphConsumptionDataURL = canvas.toDataURL('image/png'));

    doc.text(title, 1, 1);
    doc.addImage(consumptionDataURL, 'PNG', 1, 1, 0, 0, 'econsumption_details');
    doc.addPage();
    doc.addImage(graphConsumptionDataURL, 'PNG', 1, 1, 0, 0, 'econsumption_graph_consumption');
    doc.addPage();
    doc.addImage(graphCostDataURL, 'PNG', 1, 1, 0, 0, 'econsumption_graph_cost');
    doc.save(title + '.pdf'); // Generated PDF 
  }

}
