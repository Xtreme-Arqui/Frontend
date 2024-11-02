import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, retry, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TouristService {
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

 //GET
  getTouristsById(touristId: any): Observable<any> {
    return this.http.get(`${this.baseUrl}/tourists/${touristId}`, this.httpOptions)
    .pipe(retry(2), catchError(this.handleError));
  }
  //UPDATE
  updateTourists(touristId: number, item: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/tourists/${touristId}`,JSON.stringify(item), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
  //DELETE
  deleteRoute(touristId: number): Observable<any>{
    return this.http.delete(`${this.baseUrl}/tourists/${touristId}`,this.httpOptions)
    .pipe(retry(2), catchError(this.handleError));
  }
  //GET
  getTourists(): Observable<any> {
    return this.http.get(`${this.baseUrl}/tourists`, this.httpOptions)
    .pipe(retry(2), catchError(this.handleError));
  }
  //POST
  addTourist(item:any): Observable<any>{
    return this.http.post(`${this.baseUrl}/tourists`,item, this.httpOptions)
    .pipe(retry(2), catchError(this.handleError));
  }
}
