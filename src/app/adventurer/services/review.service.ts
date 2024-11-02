import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { Review } from '../models/review.model';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  baseUrl: string = `${environment.baseURL}`;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private http: HttpClient) { }

  handleError(error: HttpErrorResponse) {
    // Default error handling
    if (error.error instanceof ErrorEvent) {
      console.error(`An error occurred: ${error.error.message}`);
    } else {
      // Unsuccessful Response Error Code returned from Backend
      console.log(`Backend returned core ${error.status}, body was ${error.error}`);
    }
    // Return an observable with a user-facing error message
    return throwError(() => new Error('Something happened with request, please try again later.'));
  }


  //SERVICE REVIEWS
  getReviews(): Observable<any> {
    return this.http.get(`${this.baseUrl}/service-reviews`, this.httpOptions);
  }


  //SERVICE / SERVICE REVIEWS
  //UPDATE
  updateRoute(agencyId: any, touristId: any, reviewId: any, item: Review): Observable<any> {
    return this.http.put(`${this.baseUrl}/agency/${agencyId}/sagency-reviews/touristId=${touristId}/${reviewId}`,item, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
  //DELETE
  deleteRoute(agencyId: any, touristId: any, reviewId: any): Observable<any>{
    return this.http.delete(`${this.baseUrl}/agency/${agencyId}/sagency-reviews/touristId=${touristId}/${reviewId}`,this.httpOptions)
    .pipe(retry(2), catchError(this.handleError));
  }
  //POST
  createReview(agencyId: any, touristId: any, review: Review): Observable<any> {
    return this.http.post(`${this.baseUrl}/agency/${agencyId}/sagency-reviews/touristId=${touristId}`, review);
  }
  //GET
  getReviewsByAgency(agencyId: any): Observable<any> {
    return this.http.get(`${this.baseUrl}/agency/${agencyId}/sagency-reviews`, this.httpOptions)
    .pipe(retry(2), catchError(this.handleError));
  }
  
  
}
