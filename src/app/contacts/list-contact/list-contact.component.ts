import { Component, OnInit } from '@angular/core';
import { Message } from '../contact';
import { ContactService } from '../service/contact.service';
import { Router } from '@angular/router';
import { PagerService } from 'src/app/pager/service/pager.service';

@Component({
  selector: 'app-list-contact',
  templateUrl: './list-contact.component.html',
  styleUrls: ['./list-contact.component.scss']
})
export class ListContactComponent implements OnInit {

  message: Message[] = null;

  // array of all items to be paged
  private allItems: Message[];
  // pager object
  pager: any = {};
  // paged items
  pagedItems: any[];

  constructor(
    private contactService: ContactService,
    private router: Router,
    private pagerService: PagerService
  ) { }

  ngOnInit() {
    this.getMessages();
  }

  getMessages() {
    this.contactService.getAllMessages().subscribe(
      (message: Message[]) => {
        this.message = message;
        // set items to json response
        this.allItems = this.message;
        // initialize to page 1
        this.setPage(1);
      });
  }

  goDisplay(message: Message): void {
    const link = ['contact', message.id];
    this.router.navigate(link);
  }

  delete(message: Message): void {
    this.contactService.deleteMessage(message).subscribe(
      reponse => {
        this.getMessages();
      }
    );
  }

  setPage(page: number) {
    // get pager object from service
    this.pager = this.pagerService.getPager(this.allItems.length, page);
    // get current page of items
    this.pagedItems = this.allItems.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }
}
