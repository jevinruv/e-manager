import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PredictionService } from '../services/prediction.service';
import { Prediction } from '../models/prediction';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-prediction-details',
  templateUrl: './prediction-details.component.html',
  styleUrls: ['./prediction-details.component.css']
})
export class PredictionDetailsComponent implements OnInit {

  predictionData: any[];

  view: any[] = [700, 400];

  // options
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

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private predictionService: PredictionService,
    private toastr: ToastrService
    ) { }

  ngOnInit(): void {

    this.id = this.route.snapshot.paramMap.get('id');

    if(this.id){
      this.predictionService.get(this.id).subscribe((data: Prediction) => {
        this.prediction = data;

        this.predictionData = this.prediction.predictionItems.map(p => (
          {"name" :p.consumptionDate, "value":p.consumption}
          ));
      });
    }
    else{
      this.isReadOnly = false;
    }

  }

  onSubmit() {

    // console.log(this.prediction);

    let pred = {
      "duration": this.prediction.duration,
      "frequency": this.prediction.frequency
    }

    console.log(pred);

    this.predictionService.predict(pred).subscribe(data => {
      console.log(data);
      this.prediction = data;
      this.router.navigateByUrl("/prediction/"+ this.prediction.id);
    });

    this.toastr.success("Prediction Submitted", "Success");
  }

}
