import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isNavbarCollapsed;
  username: string;
  authority: string;

  constructor(
    // private tokenService: TokenStorageService,
  ) { }

  ngOnInit() {
    // this.username = this.tokenService.getUsername();
    // this.authority = this.tokenService.getAuthority();
  }

  toggleNavbar() {
    this.isNavbarCollapsed = !this.isNavbarCollapsed;
  }

  logout() {
    // this.tokenService.signout();
    window.location.reload();
  }

}
