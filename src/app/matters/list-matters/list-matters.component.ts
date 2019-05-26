import { Router, ActivatedRoute } from '@angular/router';
import { Matter } from './../matter';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatterService } from '../service/matter.service';
import { PagerService } from 'src/app/pager/service/pager.service';

declare var $;
@Component({
  selector: 'app-list-matters',
  templateUrl: './list-matters.component.html',
  styleUrls: ['./list-matters.component.scss']
})
export class ListMattersComponent implements OnInit {

  matters: Matter[] = null;
  message: string;
  submitted: boolean = false;
  // array of all items to be paged
  private allItems: Matter[];
  // pager object
  pager: any = {};
  // paged items
  pagedItems: any[];

  @ViewChild('modal') modal: ElementRef;

  constructor(
    private matterService: MatterService,
    private router: Router,
    private route: ActivatedRoute,
    private pagerService: PagerService
    ) { }

  ngOnInit() {
    this.getMatters();
    this.matterService.currentMessage.subscribe(message => this.message = message);
    if (this.message === 'True') {
      this.submitted = true;
      $(this.modal.nativeElement).modal('show');
    }
  }

  setPage(page: number) {
    // get pager object from service
    this.pager = this.pagerService.getPager(this.allItems.length, page);
    // get current page of items
    this.pagedItems = this.allItems.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }


  getMatters() {
    this.matterService.getAllMatters().subscribe(
      (matters: Matter[]) => {
      this.matters = matters;
      // set items to json response
      this.allItems = this.matters;
      // initialize to page 1
      this.setPage(1);
      });

  }

  goAdd(): void {
   const link = [`matters/form` , -1];
   this.router.navigate(link);
    }

  goDisplay(matter: Matter): void {
   const link = ['matters' , matter.id];
   this.router.navigate(link);
  }

  goEdit(matter: Matter): void {
    const link = [`matters/form/${matter.id}`];
    this.router.navigate(link);
  }

  delete(matter: Matter): void {
  this.matterService.deleteMatter(matter).subscribe(
     reponse => {
      const link = [`matters`];
      this.router.navigate(link);
      this.getMatters();
     }
   );
  }

}
