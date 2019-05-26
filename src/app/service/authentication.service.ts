import { ApiEndPoint } from './../config/api.url';
import { tap, catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from '../users/user';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {


  host: string = ApiEndPoint.API_ENDPOINT;

  private jwtToken = null;
  private roles: Array<any> = [];
  private email: string;
  result: boolean;
  constructor(private http: HttpClient) { }

  // login(user): Observable<any> {
  //   return this.http.post<any>(this.host + `/login`, user, {
  //       headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  //       observe: 'response'
  //     });
  // }

  saveToken(jwt: string) {
    // this.jwtToken = jwt;
    // sessionStorage.setItem('token', jwt);
    // const jwtHelper = new JwtHelperService();
    // this.roles = jwtHelper.decodeToken(this.jwtToken).roles;
    // this.email = jwtHelper.decodeToken(this.jwtToken).sub;
    // sessionStorage.setItem('email', this.email);
    // const expirationDate = jwtHelper.getTokenExpirationDate(this.jwtToken);
    // const isExpired = jwtHelper.isTokenExpired(this.jwtToken);
    // console.log("this.roles " + this.roles);
    // console.log("Expiration date " + expirationDate);
    // console.log("Is expired " + isExpired);
  }

  saveEmail(email: string) {
    localStorage.setItem('email', email);
  }

  logoutToken() {
    this.jwtToken = null;
    localStorage.removeItem('email');
  }

  isUserLoggedIn() {
     const user = localStorage.getItem('email');
     return !(user === null);
  }

  isAdmin1() {
    let jwtHelper = new JwtHelperService();
    this.roles = jwtHelper.decodeToken(this.jwtToken).roles;
    if (this.roles[0] === 'ADMIN') {
      return true;
    }
  }

  private handleError<T>(operation= 'operation', result?: T) {
    return (error: any): Observable<T> => {
      return   of(result as T);
    };
  }

  getUserByEmail(email: string): Observable <User> {
    // if (this.jwtToken == null) {
    //   this.jwtToken = localStorage.getItem('token');
    // }
    const httpOptions = {
      // headers: new HttpHeaders({ 'Authorization': this.jwtToken })
   };
    const url = `${this.host}profil/${email}`;
    return this.http.get<User>(url, httpOptions).pipe(
      tap(_ => console.log(`fetched user by email =${email}`)),
      catchError(this.handleError<User>(`get User id=${email}`))
    );
  }

  getUserById(id: number): Observable <User> {
    if (this.jwtToken == null) {
      this.jwtToken = localStorage.getItem('token');
    }
    const httpOptions = {
      // headers: new HttpHeaders({ 'Authorization': this.jwtToken })
   };
    const url = `${this.host}getUserById/${id}`;
    return this.http.get<User>(url, httpOptions).pipe(
      tap(_ => console.log(`fetched user by id =${id}`)),
      catchError(this.handleError<User>(`get User id=${id}`))
    );
  }

  private log(log: string) {
    console.log(log);
  }

  login(email: string , password: string): Observable<User> {
    const url = `${this.host}login`;
    const params = new HttpParams()
    .set('email', email)
    .set('password', password);
    return this.http.get<User>(url, {params: params}).pipe(
      tap(_ => this.log(`fetched email email=${email}
       fetched  password=${password}`)),
      catchError(this.handleError<User>(`email=${email}
      password=${password}`))
    );
  }

  isEtudiant(role: string): boolean {
        if ( role === 'Etudiant') {
          this.result = true;
        } else {
          this.result =  false;
        }
    return this.result;
  }

  isEnseignant(role: string): boolean {
    if ( role === 'Enseignant') {
      this.result = true;
    } else {
      this.result =  false;
    }
return this.result;
}
 
}
