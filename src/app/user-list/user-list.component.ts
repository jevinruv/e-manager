import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  userList = [];
  filteredUserList = [];

  constructor(private userService: UserService) { }

  ngOnInit() {

    this.userService.getAll().subscribe(data => {
      console.log(data);
      this.filteredUserList = this.userList = data;
    });
  }

  filter(query: string) {
    this.filteredUserList = (query) ?
      this.userList.filter(user => user.username.includes(query.toLocaleLowerCase())) :  this.userList;
  }


}
