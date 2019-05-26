import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SearchService } from '../service/search.service';
import { PagerService } from 'src/app/pager/service/pager.service';
import { Document } from 'src/app/documents/document';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss']
})
export class SearchResultComponent implements OnInit {

  documents: Document[] = null;
  document: Document;
  public documentName: string;
  public documentMatter: string;
  // array of all items to be paged
  private allItems: Document[];
  // pager object
  pager: any = {};
  // paged items
  pagedItems: any[];
  isNotDocument = true;

  constructor(
    private searchService: SearchService,
    private route: ActivatedRoute,
    private router: Router,
    private pagerService: PagerService
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.documentName = params['documentName'];
      this.documentMatter = params['documentMatter'];
      console.log(' documentName  >>', this.documentName, this.documentMatter);

      this.searchService.searchDocument(this.documentName, this.documentMatter)
      .subscribe(
        (documents: Document[]) => {
        if ( documents.length === 0 ) {
          this.isNotDocument = false ;
        } else {
           this.isNotDocument = true ;
           this.documents = documents;
           // set items to json response
           this.allItems = this.documents;
           // initialize to page 1
           this.setPage(1);
        }
      });
    });
  }

  goDisplay(document: Document): void {
    const link = ['display-document' , document.id];
    this.router.navigate(link);
   }

   setPage(page: number) {
    // get pager object from service
    this.pager = this.pagerService.getPager(this.allItems.length, page);
    // get current page of items
    this.pagedItems = this.allItems.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }
}
