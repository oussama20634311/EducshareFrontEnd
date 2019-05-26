import { ApiEndPoint } from './../../config/api.url';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { Document } from 'src/app/documents/document';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  host: string = ApiEndPoint.API_ENDPOINT;
  educshare_url: string = this.host;
  constructor(private http: HttpClient) { }

  private log(log: string) {
    console.log(log);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      return of(result as T);
    };
  }

  searchDocument(documentName: string, documentMatter: string): Observable<Document[]> {
    const url = `${this.educshare_url}`;
    const params = new HttpParams()
      .set('documentName', documentName)
      .set('documentMatter', documentMatter);

    return this.http.get<Document[]>(url + 'search-documents', { params: params }).pipe(
      tap(_ => this.log(`fetched Document documentName=${documentName}
       fetched Document documentMatter=${documentMatter}`)),
      catchError(this.handleError<Document[]>(`documentName=${documentName}
       documentMatter=${documentMatter}`))
    );
  }

  /* GET Document search */
  searchCours(term: string): Observable<Document[]> {
    if (!term.trim()) {
      // si le terme de recherche n'existe pas, on renvoie un tableau vide.
      return of([]);
    }
    return this.http.get<Document[]>(`${this.educshare_url}search-cours?documentName=${term}`).pipe(
      tap(_ => this.log(`found Document matching "${term}"`)),
      catchError(this.handleError<Document[]>('searchDocument', []))
    );
  }

  /* GET Document search */
  searchMatter(term: string): Observable<Document[]> {
    if (!term.trim()) {
      // si le terme de recherche n'existe pas, on renvoie un tableau vide.
      return of([]);
    }
    return this.http.get<Document[]>(`${this.educshare_url}search-matters?documentMatter=${term}`).pipe(
      tap(_ => this.log(`found Document matching "${term}"`)),
      catchError(this.handleError<Document[]>('searchDocument', []))
    );
  }
}

/*
les méthodes append () et set () return le même résultat:
params = params.append('documentName', documentName); équivalent .set('documentName', documentName)
*/


