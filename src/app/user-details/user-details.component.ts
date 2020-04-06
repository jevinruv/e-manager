import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { TokenService } from '../services/token.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  user: User = new User();

  isReadOnly = true;
  id: string;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private tokenService: TokenService,
    private toastr: ToastrService,
    private router: Router,
  ) { }

  ngOnInit() {

    this.id = this.route.snapshot.paramMap.get('id');

    if(!this.tokenService.isAdmin() && this.tokenService.getUserID() != this.id){
      this.toastr.warning("Not Accessible");
      return this.router.navigateByUrl('/');;
    }
    
    if (this.id) {
      this.userService.get(this.id).subscribe(data => {
        console.log(data);
        this.user = data;
      });
    }
    else {
      this.isReadOnly = false;
    }
  }

  onSubmit() {

    this.userService.addOrUpdate(this.user).subscribe(data => {
      // console.log(data);
      this.isReadOnly = true;
    });
  }

  edit() {
    this.isReadOnly = !this.isReadOnly;
  }


}
