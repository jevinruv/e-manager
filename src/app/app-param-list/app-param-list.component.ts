import { Component, OnInit } from '@angular/core';
import { CommonValueService } from '../services/common-value.service';

@Component({
  selector: 'app-app-param-list',
  templateUrl: './app-param-list.component.html',
  styleUrls: ['./app-param-list.component.css']
})
export class AppParamListComponent implements OnInit {

  appParamList = [];
  filteredAppParamList = [];

  constructor(private commonValueService: CommonValueService ) { }

  ngOnInit(): void {

    this.commonValueService.getAll().subscribe(data => {
      console.log(data);
      this.filteredAppParamList = this.appParamList = data;
    });
  }

  filter(query: string) {
    this.filteredAppParamList = (query) ?
      this.appParamList.filter(chatBotData => chatBotData.key.toLowerCase().includes(query.toLowerCase())) : this.appParamList;
  }

}
