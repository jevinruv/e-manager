import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { PredictionListComponent } from './prediction-list/prediction-list.component';
import { PredictionDetailsComponent } from './prediction-details/prediction-details.component';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from './ui/navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { LoginLayoutComponent } from './ui/layouts/login-layout/login-layout.component';
import { DefaultLayoutComponent } from './ui/layouts/default-layout/default-layout.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { RegisterComponent } from './register/register.component';
import { EconsumptionListComponent } from './econsumption-list/econsumption-list.component';
import { FaqListComponent } from './faq-list/faq-list.component';
import { FaqDetailsComponent } from './faq-details/faq-details.component';
import { EconsumptionsDetailsComponent } from './econsumptions-details/econsumptions-details.component';

@NgModule({
  declarations: [
    AppComponent,
    PredictionListComponent,
    PredictionDetailsComponent,
    NavbarComponent,
    LoginComponent,
    LoginLayoutComponent,
    DefaultLayoutComponent,
    UserListComponent,
    UserDetailsComponent,
    RegisterComponent,
    EconsumptionListComponent,
    FaqListComponent,
    FaqDetailsComponent,
    EconsumptionsDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
    NgxChartsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
