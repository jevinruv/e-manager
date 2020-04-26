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

    let email = this.tokenStorage.getEmail();

    if (email) {
      return true;
    }

    this.toastr.warning("Please Log in!");
    this.router.navigate(['/login']);
    return false;
  }
  
}
