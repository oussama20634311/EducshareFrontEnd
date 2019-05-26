import { AddMatterComponent } from './add-matter/add-matter.component';
import { DisplayMattersComponent } from './display-matters/display-matters.component';
import { ListMattersComponent } from './list-matters/list-matters.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

const mattersRoutes: Routes = [
  { path: 'matters', component: ListMattersComponent },
  { path: 'matters/:id' , component: DisplayMattersComponent},
  { path: 'matters/form/:id' , component: AddMatterComponent}
];

@NgModule({
 imports: [
  RouterModule.forChild(mattersRoutes)
 ],
 exports: [RouterModule]
})
export class MattersRoutingModule { }
