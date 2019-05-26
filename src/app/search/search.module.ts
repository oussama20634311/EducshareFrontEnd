import { PagerModule } from './../pager/pager.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchRoutingModule } from './search.routing.module';
import { SearchComponent } from './search/search.component';
import { SearchService } from './service/search.service';
import { SearchResultComponent } from './search-result/search-result.component';
import { MatFormFieldModule, MatInputModule, MatAutocompleteModule, MatButtonModule } from '@angular/material';
@NgModule({
  declarations: [
    SearchComponent,
    SearchResultComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'}),
    SearchRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    MatButtonModule,
    PagerModule
  ],
  exports: [
    SearchComponent
  ],
  providers: [SearchService]

})
export class SearchModule { }
