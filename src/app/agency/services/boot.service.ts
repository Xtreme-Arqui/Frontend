import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment.development";
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {catchError, Observable, retry, throwError} from "rxjs";
import {Boot} from "../models/boot.model";

@Injectable({
  providedIn: 'root'
})
export class BootService {
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
  getBoots(): Observable<any> {
    return this.http.get(`${this.baseUrl}/boots`)
      .pipe(retry(2), catchError(this.handleError));
  }
}




