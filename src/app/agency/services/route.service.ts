import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { Route } from '../models/route.model';

@Injectable({
  providedIn: 'root'
})
export class RouteService {
  private baseUrl: string = `${environment.baseURL}`;

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

  //SERVICE
  //GET
  getRoutes(): Observable<any> {
    return this.http.get(`${this.baseUrl}/services`, this.httpOptions)
    .pipe(retry(2), catchError(this.handleError));
  }
  //GET
  getRouteById(routeId: any): Observable<any> {
    return this.http.get(`${this.baseUrl}/services/${routeId}`, this.httpOptions)
    .pipe(retry(2), catchError(this.handleError));
  }


  //AGENCY/SERVICES
  //UPDATE
  updateRoute(agencyId: any, routeId: any, item: Route): Observable<any> {
    return this.http.put(`${this.baseUrl}/agencies/${agencyId}/services/${routeId}`,item, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
  //DELETE
  deleteRoute(agencyId: any, routeId: any): Observable<any>{
    return this.http.delete(`${this.baseUrl}/agencies/${agencyId}/services/${routeId}`,this.httpOptions)
    .pipe(retry(2), catchError(this.handleError));
  }
  //GET
  getRoutesByAgency(agencyId: any): Observable<any> {
    return this.http.get(`${this.baseUrl}/agencies/${agencyId}/services`, this.httpOptions)
    .pipe(retry(2), catchError(this.handleError));
  }
  //POST
  addRoute(agencyId: any, item:any): Observable<any>{
    return this.http.post(`${this.baseUrl}/agencies/${agencyId}/services`,item, this.httpOptions)
    .pipe(retry(2), catchError(this.handleError));
  }
}
