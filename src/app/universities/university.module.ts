import { CountryModule } from './../countries/country.module';
import { AddUniversityComponent } from './add-university/add-university.component';
import { ListUniversityComponent } from './list-university/list-university.component';
import { UniversityService } from './service/university.service';
import { PagerModule } from './../pager/pager.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UniversitiesRoutingModule } from './universities.routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DisplayUniversityComponent } from './display-university/display-university.component';

@NgModule({
  declarations: [
    ListUniversityComponent,
    AddUniversityComponent,
    DisplayUniversityComponent
  ],
  imports: [
    CommonModule,
    UniversitiesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    PagerModule,
    CountryModule
  ],
  exports: [ListUniversityComponent],
  providers: [UniversityService]
})
export class UniversityModule { }
