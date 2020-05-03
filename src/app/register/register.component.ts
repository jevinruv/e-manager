import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { TokenService } from '../services/token.service';
import { User } from '../models/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user: User = new User();
  
  constructor(
    private userService: UserService,
    private toastr: ToastrService,
    private tokenService: TokenService,
    private router: Router) { }

  ngOnInit() {
    let token = this.tokenService.getEmail();
    if (token) {
      this.router.navigateByUrl('');
    }
  }

  onSubmit() {

    console.log(this.user);

    const isEmpty = Object.values(this.user).find(x => {
      if(x === null || x === '') return true
    });
    // const isEmpty = Object.keys(this.user).length === 0;

    console.log(isEmpty);

    if(isEmpty){
      this.toastr.error("Enter all data");
      return;
    }

    this.user.type = "NORMAL";

    this.userService.addOrUpdate(this.user).subscribe(
      data => {

        if (data) {
          this.toastr.success("User Registered Successfully");
          this.router.navigateByUrl('/login');
        }
        else {
          this.toastr.error("User Already Exists");
        }
      },
      error => {
        console.log(error);
        this.toastr.error(error.error.message);
      }
    );
  }

}
