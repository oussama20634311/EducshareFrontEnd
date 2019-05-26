import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DepartementRoutingModule } from './departement.routing.module';
import { ListDepartmentComponent } from './list-department/list-department.component';
import { DisplayDepartmentComponent } from './display-department/display-department.component';
import { DepartmentService } from './service/department.service';
import { FormControl, FormGroup, FormsModule , ReactiveFormsModule} from '@angular/forms';
import { DepartmentFormComponent } from './department-form/department-form.component';
import { PagerModule } from './../pager/pager.module';

@NgModule({
  declarations: [
    ListDepartmentComponent,
    DisplayDepartmentComponent,
    DepartmentFormComponent
  ],
  exports: [ListDepartmentComponent],
  providers: [DepartmentService],
  imports: [
    CommonModule,
    DepartementRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    PagerModule
  ]
})
export class DepartementModule { }
