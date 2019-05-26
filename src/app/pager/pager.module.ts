import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagerService } from './service/pager.service';
import { PaginationComponent } from './pagination/pagination.component';

@NgModule({
  declarations: [
    PaginationComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    PaginationComponent
  ],
  providers: [PagerService],
})
export class PagerModule { }
