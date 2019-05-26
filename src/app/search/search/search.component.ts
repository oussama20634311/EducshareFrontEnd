import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { SearchService } from '../service/search.service';
import { Subject, Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Document } from 'src/app/documents/document';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  constructor(private searchService: SearchService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute) { }

  reactiveForm: FormGroup;
  // Subject appartient la libraire RXJS cette classe permettre
  // stocke recherche successive d'un tableau
  private searchTerms = new Subject<string>();
  documentsCours$: Observable<Document[]>;
  documentsMatters$: Observable<Document[]>;
  term: string ;
  ngOnInit() {
    this.documentsCours$ = this.searchTerms.pipe(
      // attendre 300ms de pause entre chaque requête
      debounceTime(100),
      // ignorer la recherche en cours si c'est la même que la précédente
      distinctUntilChanged(),
      // on retourne la liste des résultats correpsondant aux termes de la recherche
      switchMap((term: string) =>
        this.searchService.searchCours(term)));

    this.documentsMatters$ = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) =>
      this.searchService.searchMatter(term)));

    this.reactiveForm = this.fb.group({
      documentName: new FormControl(''),
      documentMatter: new FormControl('')
    });
  }

  // Ajoute un terme de recherche dans le flux de l'Observable 'searchTerms'
  searchDocumentName(event: any): void {
    this.term = event.target.value;
    this.searchTerms.next(this.term);
  }

  searchDocumentMatter(event: any): void {
    this.term = event.target.value;
    this.searchTerms.next(this.term);
  }

  searchDocument(searchForm: FormGroup) {
    if (searchForm.valid) {
      const document = searchForm.value;
      const navigationExtras: NavigationExtras = {
        queryParams: {
          'documentName': document.documentName,
          'documentMatter': document.documentMatter
        }
      };
      this.router.navigate(['/search-document'], navigationExtras);
    }
  }
}
