import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, retry, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TouristService {
  private baseUrl:string = `${environment.baseURL}/tourist`;

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

  getTourists(): Observable<any> {
    return this.http.get(`${this.baseUrl}`)
    .pipe(retry(2), catchError(this.handleError));
  }

  getTouristsById(touristId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/tourist/${touristId}`)
    .pipe(retry(2), catchError(this.handleError));
  }

  updateTourists(touristId: number, item: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/tourist/${touristId}`,JSON.stringify(item), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
}
