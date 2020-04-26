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
      let token = this.tokenService.getEmail();
      if (token) {
        this.router.navigateByUrl('/');
      }
    }

  onSubmit(loginForm) {

    // console.log(loginForm);

    if(!(loginForm.email || loginForm.password)){
      this.toastr.error("Fields are empty!");
    }

    this.userService.login(loginForm)
      .subscribe(
        data => {
          console.log(data);
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

      this.tokenService.saveType(data.type);
      this.tokenService.saveUserID(data.id);
      // this.tokenService.saveEmail(data.email);

      let ee = data.email
      console.log(ee)

      this.tokenService.saveEmaile(ee);

      this.router.navigateByUrl('/home');
    }
    else {
      this.toastr.error("Invalid Credentials!");
    }
  }

}
