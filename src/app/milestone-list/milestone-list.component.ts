import { Component, OnInit } from '@angular/core';
import { MilestoneService } from '../services/milestone.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-milestone-list',
  templateUrl: './milestone-list.component.html',
  styleUrls: ['./milestone-list.component.css']
})
export class MilestoneListComponent implements OnInit {

  mileStoneList = [];
  filteredMileStoneList = [];
  selectedYear;
  mileStoneYearList = [];

  constructor(private mileStoneService: MilestoneService) { }

  ngOnInit(): void {

    this.mileStoneService.getAll().subscribe(data => {
      console.log(data);
      this.filteredMileStoneList = this.mileStoneList = data;

      this.initYearList();
    });
  }

  // filter(query: string) {
  //   this.filteredMileStoneList = (query) ?
  //     this.mileStoneList.filter(chatBotData => chatBotData.code.toLowerCase().includes(query.toLowerCase())) : this.mileStoneList;
  // }

  initYearList(){

    let yearList = _.groupBy(this.mileStoneList, c => {
      return c.mileStoneDate.substring(0, 4);
    });

    this.mileStoneYearList.push("All");
    this.mileStoneYearList.push(...Object.keys(yearList));

    console.log(this.mileStoneYearList);
  }

  onYearSelected(){
    // console.log(this.selectedYear);

    if(this.selectedYear == "All"){
      this.filteredMileStoneList = this.mileStoneList;
    }
    else{
      this.filteredMileStoneList = this.mileStoneList.filter(m => m.mileStoneDate.substring(0, 4) == this.selectedYear);
    }

    console.log(this.filteredMileStoneList);

  }

}
