import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PredictionListComponent } from './prediction-list/prediction-list.component';
import { PredictionDetailsComponent } from './prediction-details/prediction-details.component';


const routes: Routes = [
  // { path: 'electricity-consumption', component: ElectricityConsumptionListComponent },
  // { path: 'electricity-consumption/:id', component: ElectricityConsumptionDetailsComponent },

  { path: 'prediction/new', component: PredictionDetailsComponent },
  { path: 'prediction/:id', component: PredictionDetailsComponent },
  { path: 'prediction', component: PredictionListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
