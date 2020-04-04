import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { TokenService } from '../services/token.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private tokenStorage: TokenService,
    private toastr: ToastrService
  ) { }

  canActivate() {

    let username = this.tokenStorage.getUsername();

    if (username) {
      return true;
    }

    this.toastr.warning("Please Log in!");
    this.router.navigate(['/login']);
    return false;
  }
  
}
