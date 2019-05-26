import { ApiEndPoint } from './../config/api.url';
import { Course } from './course';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable , of, BehaviorSubject } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  host: string = ApiEndPoint.API_ENDPOINT;
  educshare_url: string = this.host + "courses";

  constructor(private http: HttpClient) {}
 /*BehaviorSubject= a obligatoirement une valeur par défaut. Il sauvegarde la dernière valeur
   qu'il a émis et l'envoie aux observateurs lors de leur subscribe */
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

  getAllCourses(): Observable<Course[]> {
    const httpOptions = {
      // headers: new HttpHeaders({ 'Authorization': this.jwtToken })
   };
    return this.http.get<Course[]>(this.educshare_url, httpOptions).pipe(
      tap(_ => this.log('Fetched courses')),
      catchError(this.handleError('getcourses', []))
    );
  }

  getCourse(id: number): Observable <Course> {
    const httpOptions = {
      // headers: new HttpHeaders({ 'Authorization': this.jwtToken })
   };
    const url = `${this.educshare_url}/${id}`;
    return this.http.get<Course>(url, httpOptions).pipe(
      tap(_ => this.log(`fetched course id=${id}`)),
      catchError(this.handleError<Course>(`getCourse id=${id}`))
    );
  }

  addCourse(course: Course): Observable<Course> {
    const httpOptions = {
      //  headers: new HttpHeaders({ 'Authorization': this.jwtToken })
    };
    return this.http.post(this.educshare_url, course, httpOptions).pipe(
      tap(_ => this.log(`Add course`)),
      catchError(this.handleError<any>('add course'))
    );
  }

  deleteCourse(course: Course): Observable<Course> {
    const url = `${this.educshare_url}/${course.id}`;
    const httpOptions = {
      // headers: new HttpHeaders({ 'Authorization': this.jwtToken })
    };
    return this.http.delete<Course>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted course id=${course.id}`)),
      catchError(this.handleError<any>('delete course'))
    );
  }

  updateCourse(course: Course): Observable<Course> {
    const url = `${this.educshare_url}/${course.id}/edit`;
    const httpOptions = {
      // headers: new HttpHeaders({ 'Authorization': this.jwtToken })
    };

    return this.http.put(url, course, httpOptions).pipe(
      tap(_ => this.log(`updated course id=${course.id}`)),
      catchError(this.handleError<any>('update course'))
    );
  }
}
