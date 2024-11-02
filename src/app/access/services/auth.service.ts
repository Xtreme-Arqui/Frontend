import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable, of, switchMap } from 'rxjs';
import { TouristService } from '../../adventurer/services/tourist.service';
import { AgencyService } from '../../agency/services/agency.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserKey = 'currentUser'; 

  constructor(
    private router: Router,
    private touristService: TouristService,
    private agencyService: AgencyService) { }

  setUser(user: any) {
    localStorage.setItem(this.currentUserKey, JSON.stringify(user));
  }

  getUser(): any | null {
    const userJson = localStorage.getItem(this.currentUserKey);
    if (userJson) {
      return JSON.parse(userJson) as any;
    }
    return null;
  }

  getUserId(): any | null {
    const user = this.getUser();
    return user ? user.id : null;
  }

  isEmailRegistered(email: string): Observable<boolean> {
    return this.touristService.getTourists().pipe(
      switchMap((touristsResponse) => {
        const tourists = touristsResponse.content;
        const isTouristEmailExists = tourists.some((t: any) => t.email === email);

        if (isTouristEmailExists) {
          return of(true);
        } else {
          return this.agencyService.getAgencies().pipe(
            map((agenciesResponse) => {
              const agencies = agenciesResponse.content;
              return agencies.some((a: any) => a.email === email);
            })
          );
        }
      }),
      catchError((error) => {
        console.error('Error al verificar el correo: ', error);
        return of(false)
      })
    )
  }

  logIn(email: string, password: string): Observable<any> {
    return this.touristService.getTourists().pipe(
      switchMap((touristsResponse) => {
        console.log('Datos recibidos:', touristsResponse);
        const tourists = touristsResponse.content;

        const tourist = tourists.find(
          (t: any) => t.email === email && t.password === password
        );
        if (tourist) {
          const user = { ...tourist, userType: 'adventurer'};
          this.setUser(user);
          return of(user);
        } else {
          return this.agencyService.getAgencies().pipe(
            map((agenciesResponse) => {
              console.log('Datos recibidos:', agenciesResponse);
              const agencies = agenciesResponse.content;

              const agency = agencies.find(
                (a: any) => a.email === email && a.password === password
              );
              if (agency) {
                const user = {...agency, userType: 'agency'};
                this.setUser(user);
                console.log("se ingreso la agencia")
                return user;
                
              }
              console.log("no se ingreso la agencia")
              return null;
            })
          )
        }
      }
    ))
  }

  logOut() {
    localStorage.removeItem('currentUser');
    this.router.navigate(['/access']);
  }
}
