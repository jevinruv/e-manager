import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { TokenService } from '../services/token.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  //global variables
  user: User = new User();
  isReadOnly = true;
  id: string;

  //initialize http services and other required services (dependency injection)
  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private tokenService: TokenService,
    private toastr: ToastrService,
    private router: Router,
  ) { }

  //method is called initially when the page is loaded
  ngOnInit() {

    //get id from address bar
    this.id = this.route.snapshot.paramMap.get('id'); 

    //validate if user can access this page
    if(!this.tokenService.isAdmin() && this.tokenService.getUserID() != this.id){
      this.toastr.warning("Not Accessible");
      return this.router.navigateByUrl('/');;
    }
    
    //get user object from server if id variable is not null
    if (this.id) {
      this.userService.get(this.id).subscribe(data => {
        console.log(data);
        this.user = data;
      });
    }
    //if id variable is null, means a new user addition is selected
    else {
      this.isReadOnly = false;
    }
  }

  //method is called when the save button is clicked
  onSubmit() {

    //send the filled user object to server using the http service
    this.userService.addOrUpdate(this.user).subscribe(data => {
      // console.log(data);
      this.isReadOnly = true;
    });
  }

  //toggle page edit state
  edit() {
    this.isReadOnly = !this.isReadOnly;
  }


}
