import { ApiEndPoint } from './../config/api.url';
import { tap, catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Favori } from './favori';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FavoriService {

  host: string = ApiEndPoint.API_ENDPOINT;
  educshare_url: string = this.host + 'favoris';
  private email = null;
 // private jwtToken = null;

  constructor(private http: HttpClient) { }

  private log(log: string) {
    console.log(log);
  }
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      return of(result as T);
    };
  }

  loadEmail() {
    this.email = localStorage.getItem('email');
  }

  getUserFavoris(id: number): Observable<Favori[]> {
    // if (this.jwtToken == null) {
    //   this.loadToken();
    // }
    const httpOptions = {
      // headers: new HttpHeaders({ 'Authorization': this.jwtToken })
   };
   const url = `${this.educshare_url}/${id}`;
    return this.http.get<Favori[]>(url , httpOptions).pipe(
      tap(_ => console.log('fetched favoris')),
      catchError(this.handleError('get Favoris', []))
    );
  }
}
