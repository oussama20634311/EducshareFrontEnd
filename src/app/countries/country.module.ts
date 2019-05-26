import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CountryRoutingModule } from './country.routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListCountryComponent } from './list-country/list-country.component';


@NgModule({
  declarations: [
    ListCountryComponent
  ],
  exports: [ListCountryComponent],
  providers: [],
  imports: [
    CommonModule,
    CountryRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})

export class CountryModule { }
