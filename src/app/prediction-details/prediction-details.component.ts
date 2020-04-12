import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PredictionService } from '../services/prediction.service';
import { Prediction } from '../models/prediction';
import { ToastrService } from 'ngx-toastr';
import * as jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-prediction-details',
  templateUrl: './prediction-details.component.html',
  styleUrls: ['./prediction-details.component.css']
})
export class PredictionDetailsComponent implements OnInit {

  // options for chart
  view: any[] = [700, 400];
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Date';
  showYAxisLabel = true;
  yAxisLabel = 'Consumption';

  id: string;
  prediction: Prediction = new Prediction();
  isReadOnly = true;
  predictionData: any[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private predictionService: PredictionService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {

    this.id = this.route.snapshot.paramMap.get('id');

    if (this.id) {
      this.predictionService.get(this.id).subscribe((data: Prediction) => {
        this.prediction = data;

        this.predictionData = this.prediction.predictionItems.map(p => (
          { "name": p.consumptionDate, "value": p.consumption }
        ));
      });
    }
    else {
      this.isReadOnly = false;
    }

  }

  onSubmit() {

    // console.log(this.prediction);

    let pred = {
      "duration": this.prediction.duration,
      "frequency": this.prediction.frequency
    }

    // console.log(pred);

    this.predictionService.predict(pred).subscribe(data => {
      // console.log(data);
      this.prediction = data;
      this.router.navigateByUrl("/prediction/" + this.prediction.id);
    });

    this.toastr.success("Prediction Submitted", "Success");
  }

  printReport(){  

    let title = "Prediction #" + this.prediction.id.toString() + " on " + this.prediction.createdDate.toString();
    var data = document.getElementById('predictionDetails');  
    html2canvas(data).then(canvas => {  
      
      var doc = new jsPDF({
        orientation: 'landscape',
        unit: 'in',
        format: 'a4'
      });
      
      doc.text(title, 1, 1);

      const contentDataURL = canvas.toDataURL('image/png');
      doc.addImage(contentDataURL, 'PNG', 1, 2, 10, 4, 'prediction_graph');
      doc.save(title + '.pdf'); // Generated PDF   
    });

  }
  
}
