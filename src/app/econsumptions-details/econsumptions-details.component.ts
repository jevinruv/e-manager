import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EConsumption } from '../models/econsumption';
import { EconsumptionService } from '../services/econsumption.service';
import { CustomerCategory } from '../models/customer-category';
import { CustomerCategoryService } from '../services/customer-category.service';
import * as jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

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
  selectedCustomerCategory;

  graphData: any[];
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
  yAxisLabel: string = 'Consumption (kWh)';
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

  getCost() {

    let calc = {
      customerCategoryId: this.selectedCustomerCategory,
      consumptionValue: this.eConsumption.consumptionActual
    };

    // console.log(calc);

    this.eConsumptionService.calculateConsumption(calc).subscribe(data => {
      // console.log(data);
      this.eConsumption.consumptionActualCost = parseInt(data.toString());
    });

    this.toastr.success("Calculation Submitted");
  }

  viewGraph() {

    let year = this.eConsumption.consumptionDate.toString().split("-")[0];

    this.eConsumptionList = this.eConsumptionList.filter(o => o.consumptionDate.toString().split("-")[0] == year);
    // console.log(this.eConsumptionList);

    let actual = this.eConsumptionList.map(o => ({ value: o.consumptionActualCost, name: o.consumptionDate }));
    let planned = this.eConsumptionList.map(o => ({ value: o.consumptionPlannedCost, name: o.consumptionDate }));

    this.graphData = [
      { name: "Actual", series: actual },
      { name: "Planned", series: planned },
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
    var graphDetails = document.getElementById('graphDetails');
    let consumptionDataURL;
    let graphDataURL;

    var doc = new jsPDF({
      orientation: 'landscape',
      unit: 'in',
      format: 'a4'
    });

    await html2canvas(consumptionDetails).then(canvas => consumptionDataURL = canvas.toDataURL('image/png'));
    await html2canvas(graphDetails).then(canvas => graphDataURL = canvas.toDataURL('image/png'));
    
    doc.text(title, 1, 1);
    doc.addImage(consumptionDataURL, 'PNG', 1, 2, 0, 0, 'econsumption_details');
    doc.addPage();
    doc.addImage(graphDataURL, 'PNG', 1, 2, 0, 0, 'econsumption_graph');
    doc.save(title + '.pdf'); // Generated PDF 
  }

}
