import { ApiEndPoint } from './../../config/api.url';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Message } from '../contact';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  host: string = ApiEndPoint.API_ENDPOINT;
  educshare_url: string = this.host + "messages";

  constructor(private http: HttpClient) { }

  private log(log: string) {
    console.log(log);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      return of(result as T);
    };
  }

  getAllMessages(): Observable<Message[]> {
    const httpOptions = {
      // headers: new HttpHeaders({ 'Authorization': this.jwtToken })
    };
    return this.http.get<Message[]>(this.educshare_url, httpOptions).pipe(
      tap(_ => this.log('Fetched Message')),
      catchError(this.handleError('getMessage', []))
    );
  }

  getMessage(id: number): Observable<Message> {
    const httpOptions = {
      // headers: new HttpHeaders({ 'Authorization': this.jwtToken })
    };
    const url = `${this.educshare_url}/${id}`;
    return this.http.get<Message>(url, httpOptions).pipe(
      tap(_ => this.log(`fetched Message id=${id}`)),
      catchError(this.handleError<Message>(`getMessage id=${id}`))
    );
  }

  addMessage(message: Message): Observable<Message> {
    const httpOptions = {
      // headers: new HttpHeaders({ 'Authorization': this.jwtToken })
    };
    return this.http.post(this.educshare_url, message, httpOptions).pipe(
      tap(_ => this.log(`Add message`)),
      catchError(this.handleError<any>('add message'))
    );
  }

  deleteMessage(message: Message): Observable<Message> {
    const url = `${this.educshare_url}/${message.id}`;
    const httpOption = {
      // headers: new HttpHeaders({ 'Authorization': this.jwtToken })
    };
    return this.http.delete<Message>(url, httpOption).pipe(
      tap(_ => this.log(`deteted Message id=${message.id}`))
    );
  }
}
