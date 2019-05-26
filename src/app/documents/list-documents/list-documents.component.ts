import { Document } from './../document';
import { User } from 'src/app/users/user';
import { AuthenticationService } from './../../service/authentication.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PagerService } from 'src/app/pager/service/pager.service';

@Component({
  selector: 'app-list-documents',
  templateUrl: './list-documents.component.html',
  styleUrls: ['./list-documents.component.scss']
})
export class ListDocumentsComponent implements OnInit {

  currentUser: User;
  userDocuments: Document[];
  // array of all items to be paged
  private allItems: Document[];
  // pager object
  pager: any = {};
  // paged items
  pagedItems: any[];
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private pagerService: PagerService) { }

  ngOnInit() {
      this.authenticationService.getUserByEmail(localStorage.getItem('email')).subscribe(
        (user: User) => {
          this.currentUser = user;
          console.log('Current user 1', this.currentUser);
          console.log('Current user 2', Object.keys(user).sort());
          this.userDocuments = user['documents'];
          // set items to json response
          this.allItems = this.userDocuments;
          // initialize to page 1
          this.setPage(1);
          });
  }

  AddDocument() {
    this.router.navigate(['/add-document']);
  }

  goDisplay(document: Document): void {
    const link = ['display-document' , document.id];
    this.router.navigate(link);
   }

   setPage(page: number) {
    // get pager object from service
    this.pager = this.pagerService.getPager(this.allItems.length, page);
    // get current page of items
    this.pagedItems = this.allItems.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }

}
