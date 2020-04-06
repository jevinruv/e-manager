import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TokenService } from '../services/token.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(
    private router: Router,
    private tokenStorage: TokenService,
    private toastr: ToastrService
  ) { }

  canActivate() {

    let authority = this.tokenStorage.getType();

    if (authority && authority == "ADMIN") {
      return true;
    }

    this.toastr.error("Not Authorized Access this Page!", "Error");
    this.router.navigate(['/']);
    return false;
  }
  
}
