import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isNavbarCollapsed;
  username: string;
  type: string;

  constructor(
    private tokenService: TokenService,
  ) { }

  ngOnInit() {
    this.username = this.tokenService.getUsername();
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

}
