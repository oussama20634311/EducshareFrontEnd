import { Course } from './../course';
import { CourseService } from './../CourseService';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { PagerService } from 'src/app/pager/service/pager.service';

declare var $;
@Component({
  selector: 'app-list-course',
  templateUrl: './list-course.component.html',
  styleUrls: ['./list-course.component.scss']
})
export class ListCourseComponent implements OnInit {

  courses: Course[] = null;
  message: string;
  submitted: boolean = false;
  // array of all items to be paged
  private allItems: Course[];
  // pager object
  pager: any = {};
  // paged items
  pagedItems: any[];
/*@ViewChild = decorator est utilisé pour accéder à un composant enfant,
 présent dans le modèle, afin que vous puissiez accéder à ses propriétés et méthodes.*/
  @ViewChild('modal') modal: ElementRef;

  constructor(
    private courseService: CourseService,
    private router: Router,
    private route: ActivatedRoute,
    private pagerService: PagerService
    ) { }

  ngOnInit() {
    this.getCourses();
    this.courseService.currentMessage.subscribe(message => this.message = message);
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

  getCourses() {
    this.courseService.getAllCourses().subscribe(
      (courses: Course[]) => {
      this.courses = courses;
      // set items to json response
      this.allItems = this.courses;
      // initialize to page 1
      this.setPage(1);
      });
  }

  goAdd(): void {
   const link = [`courses/form`, -1];
   this.router.navigate(link);
  }

  goDisplay(course: Course): void {
   const link = ['courses' , course.id];
   this.router.navigate(link);
  }

  goEdit(course: Course): void {
    const link = [`courses/form/${course.id}`];
    this.router.navigate(link);
  }

  delete(course: Course): void {
  this.courseService.deleteCourse(course).subscribe(
     reponse => {
      const link = [`courses`];
      this.router.navigate(link);
      this.getCourses();
     }
   );
  }

}
