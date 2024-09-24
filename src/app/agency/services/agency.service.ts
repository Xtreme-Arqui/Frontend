import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, retry, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AgencyService {
  private baseUrl:string = `${environment.baseURL}/agency`;

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

  getAgencies(): Observable<any> {
    return this.http.get(`${this.baseUrl}`)
    .pipe(retry(2), catchError(this.handleError));
  }

  getAgencyById(agencyId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/agency/${agencyId}`)
    .pipe(retry(2), catchError(this.handleError));
  }

  updateAgency(agencyId: number, item: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/agency/${agencyId}`,JSON.stringify(item), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
  
}
