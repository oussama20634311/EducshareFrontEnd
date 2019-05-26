    
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { User } from '../user';
@Injectable({
  providedIn: 'root'
})
export class UserProfilService {

  educshare_url: string = "http://localhost:8080";
  private email = null;

  constructor(private http: HttpClient) { }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      return of(result as T);
    };
  }

  private log(log: string) {
    console.log(log);
  }

  getEmail(email: string): Observable<User> {
    const httpOptions = {
      // headers: new HttpHeaders({'Authorization': this.jwtToken })
   };
    const url = `${this.educshare_url}/profil/${email}`;
    return this.http.get<User>(url, httpOptions).pipe(
      tap(_ => this.log(`fetched email =${email}`)),
      catchError(this.handleError<User>(`getEmail id=${User}`))
    );
  }

  loadEmail() {
    this.email = localStorage.getItem('email');
  }

  updateProfileWithAvatar(user: FormData): Observable<any> {
    if (this.email == null) {
      this.loadEmail();
    }
    const url = `${this.educshare_url + '/profilWithAvatar'}/${this.email}/edit`;
    return this.http.put(url, user).pipe(
      tap(_ => this.log(`updated User email=${this.email}`)),
      catchError(this.handleError<any>('update email'))
    );
  }

  updateProfileWithoutAvatar(user: User): Observable<User> {
    const httpOptions = {
      headers: new HttpHeaders({ 'content-Type': 'application/json'})
    };
    if (this.email == null) {
      this.loadEmail();
    }
    const url = `${this.educshare_url + '/profilWithoutAvatar'}/${this.email}/edit`;
    return this.http.put(url, user, httpOptions).pipe(
      tap(_ => this.log(`updated User email=${this.email}`)),
      catchError(this.handleError<any>('update email'))
    );
  }
}
