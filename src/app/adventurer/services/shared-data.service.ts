import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {
  // BehaviorSubject mantiene el estado actual y lo emite a los nuevos suscriptores
  private filteredRoutesSource = new BehaviorSubject<any[]>([]);

  // Observable para que otros componentes puedan suscribirse
  filteredRoutes$ = this.filteredRoutesSource.asObservable();

  constructor() { }
  // Método para actualizar el arreglo
  setFilteredRoutes(routes: any[]) {
    this.filteredRoutesSource.next(routes); // Emite el nuevo valor
  }
}
