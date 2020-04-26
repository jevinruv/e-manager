import { Component, OnInit } from '@angular/core';
import { MileStone } from '../models/milestone';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MilestoneService } from '../services/milestone.service';

@Component({
  selector: 'app-milestone-details',
  templateUrl: './milestone-details.component.html',
  styleUrls: ['./milestone-details.component.css']
})
export class MilestoneDetailsComponent implements OnInit {

  milestone: MileStone = new MileStone();

  isReadOnly = true;
  id: string;

  constructor(
    private route: ActivatedRoute,
    private milestoneService: MilestoneService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit() {

    this.id = this.route.snapshot.paramMap.get('id');
   
    if (this.id) {
      this.milestoneService.get(this.id).subscribe(data => {
        console.log(data);
        this.milestone = data;
      });
    }
    else {
      this.isReadOnly = false;
    }
  }

  onSubmit() {

    this.milestoneService.addOrUpdate(this.milestone).subscribe(data => {
      // console.log(data);
      this.isReadOnly = true;
    });
  }

  edit() {
    this.isReadOnly = !this.isReadOnly;
  }

  deleteRecord(){

    this.milestoneService.deleteR(this.milestone.id).subscribe(data => {
      this.router.navigate(['/mile-stone']);
    });
  }

}
