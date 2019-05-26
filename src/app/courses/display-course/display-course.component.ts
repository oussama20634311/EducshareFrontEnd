import { ActivatedRoute, Router } from '@angular/router';
import { CourseService } from './../CourseService';
import { Component, OnInit } from '@angular/core';
import { Course } from '../course';

@Component({
  selector: 'app-display-course',
  templateUrl: './display-course.component.html',
  styleUrls: ['./display-course.component.scss']
})

export class DisplayCourseComponent implements OnInit {

  course: Course = null;

  constructor(
    private router: Router,
    private courseService: CourseService,
    private route: ActivatedRoute
    ) { }

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.courseService.getCourse(id)
    .subscribe(course => this.course = course);
  }

  goBack(): void {
    this.router.navigate(['/courses']);
  }

  delete(course: Course): void {
    this.courseService.deleteCourse(course)
    .subscribe(_ => this.goBack());
  }

}
