import { CourseFormComponent } from './course-form/course-form.component';
import { DisplayCourseComponent } from './display-course/display-course.component';
import { ListCourseComponent } from './list-course/list-course.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule, Component } from '@angular/core';

const CourseRoutes: Routes = [
  { path: 'courses' , component: ListCourseComponent },
  { path: 'courses/:id' , component: DisplayCourseComponent},
  { path: 'courses/form/:id' , component: CourseFormComponent} // Call edit or add department
];

@NgModule({
  imports: [RouterModule.forChild(CourseRoutes)],
  exports: [RouterModule]
})
export class CourseRoutingModule { }