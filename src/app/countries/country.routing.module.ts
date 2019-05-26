import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { ListCountryComponent } from './list-country/list-country.component';

const DepartementRoutes: Routes = [
  { path: 'countries', component: ListCountryComponent },
];

@NgModule({
  imports: [RouterModule.forChild(DepartementRoutes)],
  exports: [RouterModule]
})
export class CountryRoutingModule { }