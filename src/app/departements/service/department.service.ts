import { ApiEndPoint } from './../../config/api.url';
import { Departement } from './../departement';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable , of, BehaviorSubject } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  host: string = ApiEndPoint.API_ENDPOINT;
  educshare_url: string = this.host + "departments";

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
      // console.log(error);
      // console.log(`${operation} failed: ${error.message}`);
      return   of(result as T);
    };
  }

  loadToken() {
    this.jwtToken = sessionStorage.getItem('token');
  }

  getAllDepartements(): Observable<Departement[]> {
    if (this.jwtToken == null) {
      this.loadToken();
    }
    const httpOptions = {
      // headers: new HttpHeaders({ 'Authorization': this.jwtToken })
   };
    return this.http.get<Departement[]>(this.educshare_url, httpOptions).pipe(
      tap(_ => this.log('Fetched departments')),
      catchError(this.handleError('getDepartements', []))
    );

  }

  getDepartement(id: number): Observable <Departement> {
    if (this.jwtToken == null) {
      this.loadToken();
    }
    const httpOptions = {
      // headers: new HttpHeaders({ 'Authorization': this.jwtToken })
   };
    const url = `${this.educshare_url}/${id}`;
    return this.http.get<Departement>(url, httpOptions).pipe(
      tap(_ => this.log(`fetched departement id=${id}`)),
      catchError(this.handleError<Departement>(`getDepartement id=${id}`))
    );
  }

  addDepartment(department: Departement): Observable<Departement> {
    const httpOptions = {
      //  headers: new HttpHeaders({ 'Authorization': this.jwtToken })
    };
    return this.http.post(this.educshare_url, department, httpOptions).pipe(
      tap(_ => this.log(`Add departement`)),
      catchError(this.handleError<any>('addepartement'))
    );
  }

  deleteDepartement(departement: Departement): Observable<Departement> {
    const url = `${this.educshare_url}/${departement.id}`;
    const httpOptions = {
      // headers: new HttpHeaders({ 'Authorization': this.jwtToken })
    };
    return this.http.delete<Departement>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted departement id=${departement.id}`)),
      catchError(this.handleError<any>('delete departement'))
    );
  }

  updateDepartement(departement: Departement): Observable<Departement> {
    const url = `${this.educshare_url}/${departement.id}/edit`;
    const httpOptions = {
      // headers: new HttpHeaders({ 'Authorization': this.jwtToken })
    };

    return this.http.put(url, departement, httpOptions).pipe(
      tap(_ => this.log(`updated departement id=${departement.id}`)),
      catchError(this.handleError<any>('updateddepartement'))
    );
  }
}
