import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PredictionListComponent } from './prediction-list/prediction-list.component';
import { PredictionDetailsComponent } from './prediction-details/prediction-details.component';
import { LoginComponent } from './login/login.component';
import { DefaultLayoutComponent } from './ui/layouts/default-layout/default-layout.component';
import { LoginLayoutComponent } from './ui/layouts/login-layout/login-layout.component';
import { AuthGuard } from './guards/auth.guard';


const routes: Routes = [

  {
    path: '',
    component: DefaultLayoutComponent,
    canActivate: [AuthGuard],
    children:[
      { path: 'prediction/new', component: PredictionDetailsComponent },
      { path: 'prediction/:id', component: PredictionDetailsComponent },
      { path: 'prediction', component: PredictionListComponent },    
    ]
  },

  {
    path: '',
    component: LoginLayoutComponent,
    children: [
      { path: 'login', component: LoginComponent },
      // { path: 'register', component: RegisterComponent }
    ]
  },
  
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
