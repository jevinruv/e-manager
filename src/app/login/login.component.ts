import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { ToastrService } from 'ngx-toastr';
import { TokenService } from '../services/token.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private userService: UserService,
    private toastr: ToastrService,
    private tokenService: TokenService,
    private router: Router,
    ) { }

  ngOnInit() {
      let token = this.tokenService.getUsername();
      if (token) {
        this.router.navigateByUrl('');
      }
    }

  onSubmit(loginForm) {

    // console.log(loginForm);

    if(!(loginForm.username || loginForm.password)){
      this.toastr.error("Fields are empty!");
    }

    this.userService.login(loginForm)
      .subscribe(
        data => {
          // console.log(data);
          this.directUser(data);
        },
        error => {
          // console.log(error.error.message)
          this.toastr.error(error.error.message);
        }
      );
  }

  directUser(data) {

    if (data) {

      this.tokenService.saveUsername(data.username);
      this.tokenService.saveType(data.type);
      this.tokenService.saveUserID(data.id);

      // switch (this.tokenService.getType()) {
      //   case 'ADMIN':
      //     this.router.navigateByUrl('admin/home');
      //     break;
      //   case 'NORMAL':
      //     this.router.navigateByUrl('');
      //   default:
      //     this.router.navigateByUrl('/login');
      //     break;
      // }

      this.router.navigateByUrl('/');
    }
    else {
      this.toastr.error("Invalid Credentials!");
    }
  }

}
