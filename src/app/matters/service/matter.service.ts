import { ApiEndPoint } from './../../config/api.url';
import { tap, catchError } from 'rxjs/operators';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Matter } from '../matter';

@Injectable({
  providedIn: 'root'
})
export class MatterService {


  host: string = ApiEndPoint.API_ENDPOINT;
  educshare_url: string = this.host + "matters";

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

  getAllMatters(): Observable<Matter[]> {
    debugger;
    const httpOptions = {
   };
    return this.http.get<Matter[]>(this.educshare_url, httpOptions).pipe(
      tap(_ => this.log('Fetched matters')),
      catchError(this.handleError('get matters', []))
    );

  }

  getMatter(id: number): Observable <Matter> {
    const httpOptions = {
      // headers: new HttpHeaders({ 'Authorization': this.jwtToken })
   };
    const url = `${this.educshare_url}/${id}`;
    return this.http.get<Matter>(url, httpOptions).pipe(
      tap(_ => this.log(`fetched Matter id=${id}`)),
      catchError(this.handleError<Matter>(`get Matter id=${id}`))
    );
  }

  addMatter(matter: Matter): Observable<Matter> {
    const httpOptions = {
      //  headers: new HttpHeaders({ 'Authorization': this.jwtToken })
    };
    return this.http.post(this.educshare_url, matter, httpOptions).pipe(
      tap(_ => this.log(`Add Matter`)),
      catchError(this.handleError<any>('Add Matter'))
    );
  }

  deleteMatter(matter: Matter): Observable<Matter> {
    const url = `${this.educshare_url}/${matter.id}`;
    const httpOptions = {
      // headers: new HttpHeaders({ 'Authorization': this.jwtToken })
    };
    return this.http.delete<Matter>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted Matter id=${matter.id}`)),
      catchError(this.handleError<any>('delete Matter'))
    );
  }

  updateMatter(matter: Matter): Observable<Matter> {
    const url = `${this.educshare_url}/${matter.id}/edit`;
    const httpOptions = {
      // headers: new HttpHeaders({ 'Authorization': this.jwtToken })
    };

    return this.http.put(url, matter, httpOptions).pipe(
      tap(_ => this.log(`updated matter id=${matter.id}`)),
      catchError(this.handleError<any>('updated Matter'))
    );
  }
}
