import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { SearchResultComponent } from './search-result/search-result.component';

const SearchRoutes: Routes = [
  { path: 'search-document' , component: SearchResultComponent}];

@NgModule({
  imports: [RouterModule.forChild(SearchRoutes)],
  exports: [RouterModule]
})
export class SearchRoutingModule { }
