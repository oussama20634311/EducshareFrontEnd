import { CourseService } from './../CourseService';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Course } from './../course';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss']
})
export class CourseFormComponent implements OnInit {

  course: Course;
  id: number;
  myForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService ,
    private router: Router,
    private formBuilder: FormBuilder) {}

    ngOnInit() {
      this.departmentInfo();
      this.myForm = this.formBuilder.group({
        courseName: ['']
      });
    }

    departmentInfo() {
      this.id = +this.route.snapshot.params['id'];
      this.course = new Course(this.id, '' , '', '' );
      if (this.id !== -1) {
      this.courseService.getCourse(this.id)
      .subscribe(
        data => this.course = data
        );
      }
    }

    save(model: any) {
      if (this.id === -1) {
        this.courseService.addCourse(this.course)
            .subscribe (
              data => {
              console.log(data);
              this.router.navigate(['courses']);
              this.courseService.displayModal('True');
              }
           );
      } else {
        this.courseService.updateCourse(this.course)
            .subscribe (
              data => {
                console.log(data);
                this.router.navigate(['courses']);
              }
            );
      }
    }
}
