import { Component, OnInit } from '@angular/core';
import { ContentService } from '../services/content.service';

@Component({
  selector: 'app-content-list',
  templateUrl: './content-list.component.html',
  styleUrls: ['./content-list.component.css']
})
export class ContentListComponent implements OnInit {

  contentList = [];
  filteredContentList = [];

  constructor(private contentService: ContentService ) { }

  ngOnInit(): void {

    this.contentService.getAll().subscribe(data => {
      console.log(data);
      this.filteredContentList = this.contentList = data;
    });
  }

  filter(query: string) {
    this.filteredContentList = (query) ?
      this.contentList.filter(forumQuestion => forumQuestion.text.toLowerCase().includes(query.toLocaleLowerCase())) : this.contentList;
  }

}
