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
    let token = this.tokenService.getUsername();
    if (token) {
      this.router.navigateByUrl('');
    }
  }

  onSubmit() {

    console.log(this.user);

    this.user.type = "NORMAL";

    this.userService.addOrUpdate(this.user).subscribe(
      data => {
        this.toastr.success("User Registered Successfully");
        this.router.navigateByUrl('/login');
      },
      error => {
        console.log(error);
        this.toastr.error(error.error.message);
      }
    );
  }

}
