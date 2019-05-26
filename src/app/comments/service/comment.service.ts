import { ApiEndPoint } from './../../config/api.url';
import { Comment } from './../comment';
import { tap, catchError } from 'rxjs/operators';
import { BehaviorSubject, Observable, of, from } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  host: string = ApiEndPoint.API_ENDPOINT;
  educshare_url: string = this.host + "comments";
  private jwtToken = null;
  constructor(private http: HttpClient) {}

  private log(log: string) {
    console.log(log);
  }

  private handleError<T>(operation= 'operation', result?: T) {
    return (error: any): Observable<T> => {
      return of (result as T);
    };
  }

  loadToken() {
    this.jwtToken = sessionStorage.getItem('token');
  }

  getAllComments(): Observable<Comment[]> {
    if (this.jwtToken == null) {
      this.loadToken();
    }
    const httpOptions = {
      // headers: new HttpHeaders({ 'Authorization': this.jwtToken })
   };
    return this.http.get<Comment[]>(this.educshare_url, httpOptions).pipe(
      tap(_ => this.log('Fetched comments')),
      catchError(this.handleError('getComments', []))
    );

  }

  getComment(id: number): Observable <Comment> {
    if (this.jwtToken == null) {
      this.loadToken();
    }
    const httpOptions = {
      // headers: new HttpHeaders({ 'Authorization': this.jwtToken })
   };
    const url = `${this.educshare_url}/${id}`;
    return this.http.get<Comment>(url, httpOptions).pipe(
      tap(_ => this.log(`fetched comment id=${id}`)),
      catchError(this.handleError<Comment>(`getComment id=${id}`))
    );
  }

  addComment(comment: Comment): Observable<Comment> {
    return this.http.post(this.educshare_url, comment).pipe(
      tap(_ => this.log(`Add comment`)),
      catchError(this.handleError<any>('adcomment'))
    );
  }

  deleteComment(comment: Comment): Observable<Comment> {
    const url = `${this.educshare_url}/${comment.id}`;
    const httpOptions = {
      // headers: new HttpHeaders({ 'Authorization': this.jwtToken })
    };
    return this.http.delete<Comment>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted comment id=${comment.id}`)),
      catchError(this.handleError<any>('delete comment'))
    );
  }


}
