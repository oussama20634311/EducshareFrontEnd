import { DepartmentFormComponent } from './department-form/department-form.component';
import { DisplayDepartmentComponent } from './display-department/display-department.component';
import { ListDepartmentComponent } from './list-department/list-department.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule, Component } from '@angular/core';

const DepartementRoutes: Routes = [
  { path: 'departments' , component: ListDepartmentComponent },
  { path: 'departments/:id' , component: DisplayDepartmentComponent},
  { path: 'departments/form/:id' , component: DepartmentFormComponent} // Call edit or add department

];

@NgModule({
  imports: [RouterModule.forChild(DepartementRoutes)],
  exports: [RouterModule]
})
export class DepartementRoutingModule { }
