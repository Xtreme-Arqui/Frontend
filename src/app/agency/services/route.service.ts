import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { Route } from '../models/route.model';

@Injectable({
  providedIn: 'root'
})
export class RouteService {
  private baseUrl: string = `${environment.baseURL}/route`;

  constructor(private http:HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':'application/json',
    })
  }

  handleError(error: HttpErrorResponse) {
    if(error.error instanceof ErrorEvent) {
      console.log(
        `An error occurred ${error.status}, body was: ${error.error}`
      );
    } else {
      console.log(
        `Backend returned code ${error.status}, body was: ${error.error}`
      );
    }
    return throwError(
      'Something happened with request, please try again later.'
    );
  }

  getRoutes(): Observable<any> {
    return this.http.get(`${this.baseUrl}`, this.httpOptions)
    .pipe(retry(2), catchError(this.handleError));
  }

  getRouteById(routeId: any): Observable<any> {
    return this.http.get(`${this.baseUrl}/${routeId}`, this.httpOptions)
    .pipe(retry(2), catchError(this.handleError));
  }

  updateRoute(routeId: any, item: Route): Observable<any> {
    return this.http.put(`${this.baseUrl}/${routeId}`,item, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  deleteRoute(routeId: any, item: any): Observable<any>{
    return this.http.delete(`${this.baseUrl}/${routeId}`,this.httpOptions)
    .pipe(retry(2), catchError(this.handleError));
  }

  addRoute(item:any): Observable<any>{
    return this.http.post(`${this.baseUrl}`,item, this.httpOptions)
    .pipe(retry(2), catchError(this.handleError));
  }
}
