import { ApiEndPoint } from './../../config/api.url';
import { tap, catchError } from 'rxjs/operators';
import { University } from './../university';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UniversityService {

  host: string = ApiEndPoint.API_ENDPOINT;
  educshare_url: string = this.host + "universities";

  private jwtToken = null;
  constructor(private http: HttpClient) {}

  private messageSource = new BehaviorSubject('False');
  currentMessage = this.messageSource.asObservable();

  displayModal(message: string) {
    this.messageSource.next(message);
  }

  private log(log: string) {
    console.log(log);
  }

  private handleError<T>(operation= 'operation', result?: T) {
    return (error: any): Observable<T> => {
      return   of(result as T);
    };
  }

  loadToken() {
    this.jwtToken = sessionStorage.getItem('token');
  }

  getAllUniversities(): Observable<University[]> {
    if (this.jwtToken == null) {
      this.loadToken();
    }
    const httpOptions = {
      // headers: new HttpHeaders({ 'Authorization': this.jwtToken })
   };
    return this.http.get<University[]>(this.educshare_url, httpOptions).pipe(
      tap(_ => this.log('Fetched universities')),
      catchError(this.handleError('get Universities', []))
    );

  }

  getUniversity(id: number): Observable <University> {
    if (this.jwtToken == null) {
      this.loadToken();
    }
    const httpOptions = {
      // headers: new HttpHeaders({ 'Authorization': this.jwtToken })
   };
    const url = `${this.educshare_url}/${id}`;
    return this.http.get<University>(url, httpOptions).pipe(
      tap(_ => this.log(`fetched university id=${id}`)),
      catchError(this.handleError<University>(`get University id=${id}`))
    );
  }

  addUniversity(university: University): Observable<University> {
    const httpOptions = {
      //  headers: new HttpHeaders({ 'Authorization': this.jwtToken })
    };
    return this.http.post(this.educshare_url, university, httpOptions).pipe(
      tap(_ => this.log(`Add university`)),
      catchError(this.handleError<any>('Add University'))
    );
  }

  deleteUniversity(university: University): Observable<University> {
    const url = `${this.educshare_url}/${university.id}`;
    const httpOptions = {
      // headers: new HttpHeaders({ 'Authorization': this.jwtToken })
    };
    return this.http.delete<University>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted university id=${university.id}`)),
      catchError(this.handleError<any>('delete university'))
    );
  }

  updateUniversity(univeristy: University): Observable<University> {
    const url = `${this.educshare_url}/${univeristy.id}/edit`;
    const httpOptions = {
      // headers: new HttpHeaders({ 'Authorization': this.jwtToken })
    };
    return this.http.put(url, univeristy, httpOptions).pipe(
      tap(_ => this.log(`updated univeristy id=${univeristy.id}`)),
      catchError(this.handleError<any>('updated university'))
    );
  }
}
