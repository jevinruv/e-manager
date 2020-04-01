import { Component, OnInit } from '@angular/core';
import { PredictionService } from '../services/prediction.service';

@Component({
  selector: 'app-prediction-list',
  templateUrl: './prediction-list.component.html',
  styleUrls: ['./prediction-list.component.css']
})
export class PredictionListComponent implements OnInit {

  predictionList = [];
  filteredPredictionList = [];

  constructor(private predictionService: PredictionService) { }

  ngOnInit(): void {

    this.predictionService.getAll().subscribe(data => {
      // console.log(data);
      this.filteredPredictionList = this.predictionList = data;
    });
  }

  filter(query: string) {
    this.filteredPredictionList = (query) ?
      this.predictionList.filter(prediction => prediction.frequency.toLowerCase().includes(query.toLocaleLowerCase())) : this.predictionList;
  }

}
