import { PagerModule } from './../pager/pager.module';
import { MatterService } from './service/matter.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MattersRoutingModule } from './matters.routing.module';
import { DisplayMattersComponent } from './display-matters/display-matters.component';
import { AddMatterComponent } from './add-matter/add-matter.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListMattersComponent } from './list-matters/list-matters.component';

@NgModule({
  declarations: [
    AddMatterComponent,
    ListMattersComponent,
    DisplayMattersComponent
  ],
  imports: [
    CommonModule,
    MattersRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    PagerModule
  ],
  exports: [ListMattersComponent],
  providers: [MatterService]
})
export class MattersModule { }
