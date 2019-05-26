import { AddUniversityComponent } from './add-university/add-university.component';
import { DisplayUniversityComponent } from './display-university/display-university.component';
import { ListUniversityComponent } from './list-university/list-university.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

const UniversitiesRoutes: Routes = [
  { path: 'universities' , component: ListUniversityComponent },
  { path: 'universities/:id' , component: DisplayUniversityComponent},
  { path: 'universities/form/:id' , component: AddUniversityComponent}
];

@NgModule({
 imports: [ RouterModule.forChild(UniversitiesRoutes)],
 exports: [ RouterModule	]
})
export class UniversitiesRoutingModule { }
