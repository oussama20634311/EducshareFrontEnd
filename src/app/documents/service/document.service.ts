import { ApiEndPoint } from './../../config/api.url';
import { Favori } from './../../favoris/favori';
import { Document } from './../document';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  host: string = ApiEndPoint.API_ENDPOINT;
  educshare_url: string = this.host;

  public userFile:  File;
  constructor(private http: HttpClient) { }

  private log(log: string) {
    console.log(log);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      return of(result as T);
    };
  }

  AddDocument(document: FormData): Observable<any> {
    return this.http.post(this.educshare_url + 'documents', document).pipe(
      tap(_ => this.log(`Add Document`)),
      catchError(this.handleError<any>('add Document'))
    );
  }

  getDocument(id: number): Observable <Document> {
    const httpOptions = {
      // headers: new HttpHeaders({ 'Authorization': this.jwtToken })
   };
    const url = `${this.educshare_url}documents/${id}`;
    return this.http.get<Document>(url, httpOptions).pipe(
      tap(_ => this.log(`fetched document id=${id}`)),
      catchError(this.handleError<Document>(`getDocument id=${id}`))
    );
  }

  addFavori(favori: Favori): Observable<any> {
    const httpOptions = {
      // headers: new HttpHeaders({ 'Authorization': this.jwtToken })
   };
    const url = `${this.educshare_url + 'favoris'}`;
    return this.http.post(url, favori, httpOptions).pipe(
      tap(_ => this.log(`Adding favori ok`)),
      catchError(this.handleError<any>('Adding favori'))
    );
  }
}
