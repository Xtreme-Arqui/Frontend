import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, retry, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AgencyService {
  private baseUrl:string = `${environment.baseURL}`;

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


  //AGENCIES
  //GET
  getAgencyById(agencyId: any): Observable<any> {
    return this.http.get(`${this.baseUrl}/agencies/${agencyId}`)
    .pipe(retry(2), catchError(this.handleError));
  }
  //PUT
  updateAgency(agencyId: any, item: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${agencyId}`,JSON.stringify(item), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
  //DELETE
  deleteRoute(agencyId: any): Observable<any>{
    return this.http.delete(`${this.baseUrl}/agencies/${agencyId}`,this.httpOptions)
    .pipe(retry(2), catchError(this.handleError));
  }
  //GET
  getAgencies(): Observable<any> {
    return this.http.get(`${this.baseUrl}/agencies`)
    .pipe(retry(2), catchError(this.handleError));
  }
  //POST
  addAgency(item:any): Observable<any>{
    return this.http.post(`${this.baseUrl}/agencies`,item, this.httpOptions)
    .pipe(retry(2), catchError(this.handleError));
  }
}
