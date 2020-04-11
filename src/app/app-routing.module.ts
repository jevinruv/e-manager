import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PredictionListComponent } from './prediction-list/prediction-list.component';
import { PredictionDetailsComponent } from './prediction-details/prediction-details.component';
import { LoginComponent } from './login/login.component';
import { DefaultLayoutComponent } from './ui/layouts/default-layout/default-layout.component';
import { LoginLayoutComponent } from './ui/layouts/login-layout/login-layout.component';
import { AuthGuard } from './guards/auth.guard';
import { UserListComponent } from './user-list/user-list.component';
import { AdminGuard } from './guards/admin.guard';
import { UserDetailsComponent } from './user-details/user-details.component';
import { RegisterComponent } from './register/register.component';
import { EconsumptionListComponent } from './econsumption-list/econsumption-list.component';
import { FaqListComponent } from './faq-list/faq-list.component';
import { FaqDetailsComponent } from './faq-details/faq-details.component';
import { EconsumptionsDetailsComponent } from './econsumptions-details/econsumptions-details.component';
import { CustomerCategoryListComponent } from './customer-category-list/customer-category-list.component';
import { CustomerCategoryDetailsComponent } from './customer-category-details/customer-category-details.component';


const routes: Routes = [

  {
    path: '',
    component: DefaultLayoutComponent,
    canActivate: [AuthGuard],
    children:[
      { path: 'prediction/new', component: PredictionDetailsComponent },
      { path: 'prediction/:id', component: PredictionDetailsComponent },
      { path: 'prediction', component: PredictionListComponent },    

      { path: 'faq/new', component: FaqDetailsComponent },
      { path: 'faq/:id', component: FaqDetailsComponent },
      { path: 'faq', component: FaqListComponent },  

      { path: 'econsumption/new', component: EconsumptionsDetailsComponent }, 
      { path: 'econsumption/:id', component: EconsumptionsDetailsComponent }, 
      { path: 'econsumption', component: EconsumptionListComponent }, 

      { path: 'user/new', component: UserDetailsComponent },    
      { path: 'user/:id', component: UserDetailsComponent },    
      { path: 'user', component: UserListComponent, canActivate: [AdminGuard] },    

      { path: 'customer-category/new', component: CustomerCategoryDetailsComponent, canActivate: [AdminGuard]},    
      { path: 'customer-category/:id', component: CustomerCategoryDetailsComponent, canActivate: [AdminGuard] },    
      { path: 'customer-category', component: CustomerCategoryListComponent, canActivate: [AdminGuard] }, 

    ]
  },

  {
    path: '',
    component: LoginLayoutComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent }
    ]
  },
  
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
