import { Component, OnInit } from '@angular/core';
import { Content } from '../models/content';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenService } from '../services/token.service';
import { ToastrService } from 'ngx-toastr';
import { ContentService } from '../services/content.service';
import { ContentAttachment } from '../models/content-attachment';

@Component({
  selector: 'app-content-details',
  templateUrl: './content-details.component.html',
  styleUrls: ['./content-details.component.css']
})
export class ContentDetailsComponent implements OnInit {

  content: Content = new Content();
  isReadOnly = true;
  id: string;
  contentAttachments: ContentAttachment[] = [];

  constructor(
    private route: ActivatedRoute,
    private contentService: ContentService,
    private tokenService: TokenService,
    private toastr: ToastrService,
    private router: Router,
  ) { }

  ngOnInit() {

    this.id = this.route.snapshot.paramMap.get('id');
   
    if (this.id) {
      this.contentService.get(this.id).subscribe(data => {
        // console.log(data);
        this.content = data;
      });
    }
    else {
      this.content.email = this.tokenService.getEmail();
      this.isReadOnly = false;
    }
  }

  onSubmitQuestion() {

    delete this.content.createdDate;

    // console.log(this.content);

    this.contentService.addOrUpdate(this.content).subscribe(data => {
      console.log(data);
      this.isReadOnly = true;
    });
  }

  changeListener($event) : void {
    this.readThis($event.target);
  }
  
  readThis(inputValue: any): void {
    var file:File = inputValue.files[0];
    var myReader:FileReader = new FileReader();
  
    myReader.onloadend = (e) => {

      // let contentAttachment : ContentAttachment = new ContentAttachment();
      // contentAttachment.image = myReader.result.toString();

      let contentAttachment = {image: myReader.result.toString()};
      this.content.contentAttachments.push(contentAttachment);
    }

    myReader.readAsDataURL(file);
  }

  edit() {
    this.isReadOnly = !this.isReadOnly;
  }

  isEditEnabled(){
    return this.tokenService.isAdmin() || this.tokenService.getEmail() == this.content.email
  }

}
