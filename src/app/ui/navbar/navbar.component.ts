import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/services/token.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isNavbarCollapsed;
  email: string;
  type: string;

  constructor(
    private tokenService: TokenService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.email = this.tokenService.getEmail();
    this.type = this.tokenService.getType();
  }

  toggleNavbar() {
    this.isNavbarCollapsed = !this.isNavbarCollapsed;
  }

  logout() {
    this.tokenService.signout();
    window.location.reload();
  }

  isAdmin(){
    return this.type === ("ADMIN");
  }

  userAccount(){

    let userId = this.tokenService.getUserID();
    this.router.navigate(['/user/'+ userId]);
  }

}
