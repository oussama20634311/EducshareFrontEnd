import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { University } from '../university';
import { UniversityService } from '../service/university.service';
import { PagerService } from 'src/app/pager/service/pager.service';

declare var $;
@Component({
  selector: 'app-list-university',
  templateUrl: './list-university.component.html',
  styleUrls: ['./list-university.component.scss']
})
export class ListUniversityComponent implements OnInit {

  universities: University[] = null;
  message: string;
  submitted: boolean = false;
  // array of all items to be paged
  private allItems: University[];
  // pager object
  pager: any = {};
  // paged items
  pagedItems: any[];

  @ViewChild('modal') modal: ElementRef;

  constructor(
    private universityService: UniversityService,
    private router: Router,
    private route: ActivatedRoute,
    private pagerService: PagerService
    ) { }

  ngOnInit() {
    this.getUniversities();
    this.universityService.currentMessage.subscribe(message => this.message = message);
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

  getUniversities() {
    this.universityService.getAllUniversities().subscribe(
      (universities: University[]) => {
      this.universities = universities;
      // set items to json response
      this.allItems = this.universities;
      // initialize to page 1
      this.setPage(1);
      });
  }

  goAdd(): void {
   const link = [`universities/form` , -1];
   this.router.navigate(link);
    }

  goDisplay(university: University): void {
   const link = ['universities' , university.id];
   this.router.navigate(link);
  }

  goEdit(university: University): void {
    const link = [`universities/form/${university.id}`];
    this.router.navigate(link);
  }

  delete(university: University): void {
  this.universityService.deleteUniversity(university).subscribe(
     reponse => {
      const link = [`universities`];
      this.router.navigate(link);
      this.getUniversities();
     }
   );
  }

}
