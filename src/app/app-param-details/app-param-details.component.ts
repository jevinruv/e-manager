import { Component, OnInit } from '@angular/core';
import { CommonValue } from '../models/common-value';
import { CommonValueService } from '../services/common-value.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-app-param-details',
  templateUrl: './app-param-details.component.html',
  styleUrls: ['./app-param-details.component.css']
})
export class AppParamDetailsComponent implements OnInit {

  appParam: CommonValue = new CommonValue();

  isReadOnly = true;
  id: string;

  constructor(
    private route: ActivatedRoute,
    private commonValueService: CommonValueService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit() {

    this.id = this.route.snapshot.paramMap.get('id');
   
    if (this.id) {
      this.commonValueService.get(this.id).subscribe(data => {
        console.log(data);
        this.appParam = data;
      });
    }
    else {
      this.isReadOnly = false;
    }
  }

  onSubmit() {

    this.commonValueService.addOrUpdate(this.appParam).subscribe(data => {
      // console.log(data);
      this.isReadOnly = true;
    });
  }

  edit() {
    this.isReadOnly = !this.isReadOnly;
  }

  deleteRecord(){

    this.commonValueService.deleteR(this.appParam.id).subscribe(data => {
      this.router.navigate(['/app-param']);
    });
  }

}
