import { DisplayCourseComponent } from './display-course/display-course.component';
import { CourseFormComponent } from './course-form/course-form.component';
import { FormsModule } from '@angular/forms';
import { CourseRoutingModule } from './course.routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListCourseComponent } from './list-course/list-course.component';

@NgModule({
  declarations: [
    ListCourseComponent,
    CourseFormComponent,
    DisplayCourseComponent
  ],
  exports: [
    DisplayCourseComponent,
    ListCourseComponent,
    CourseFormComponent
  ],
  imports: [
    CommonModule,
    CourseRoutingModule,
    FormsModule
  ]
})
export class CourseModule { }
