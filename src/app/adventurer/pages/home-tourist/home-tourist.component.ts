import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { map, shareReplay } from 'rxjs/operators';
import { Route } from '../../../agency/models/route.model';
import { RouteService } from '../../../agency/services/route.service';
import { SharedDataService } from '../../services/shared-data.service';
import { AuthService } from '../../../access/services/auth.service';

@Component({
  selector: 'app-home-tourist',
  templateUrl: './home-tourist.component.html',
  styleUrl: './home-tourist.component.css'
})
export class HomeTouristComponent implements OnInit {
  routes: Route[] = [];
  priceMin: number = 0;
  priceMax: number = 0;
  ratingFilter: number = 0;
  hoverStars: number = 0
  difficultyFilter: string = '';
  typeFilter: string = '';
  searchTerm: string = '';
  filteredRoutes: any[] = [];

  isScreenLarge: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Large)
  .pipe(
    map(result => result.matches),
    shareReplay()
  );


  constructor(
    //private authService: AuthService,
    private breakpointObserver: BreakpointObserver,
    private router: Router,
    private RouteService: RouteService,
    private sharedDataService: SharedDataService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.getRoutes();
  }

  getRoutes(): void {
    this.RouteService.getRoutes().subscribe(
      (data) => {
        this.routes = data;
        this.filteredRoutes = this.routes;
        console.log(this.routes);
      }
    )
  }

  // Controla las estrellas cuando pasa el mouse
  hoverRating(rating: number) {
    this.hoverStars = rating;
  }

  // Establece el filtro de calificación cuando el usuario hace clic
  setRating(rating: number) {
    this.ratingFilter = rating;
  }
  
  applyFilter() {
    console.log(this.searchTerm);

    this.filteredRoutes = this.routes.filter(route =>
      (!this.searchTerm || this.applySearchFilter(route)) &&
      (!this.priceMin && !this.priceMax || this.applyPriceFilter(route)) &&
      (!this.ratingFilter  || this.applyRatingFilter(route)) &&
      (!this.difficultyFilter  || this.applyDifficultyFilter(route)) &&
      (!this.typeFilter  || this.applyTypeFilter(route))
    );
    // Actualiza el servicio con las rutas filtradas
    this.sharedDataService.setFilteredRoutes(this.filteredRoutes);

    // Puedes redirigir a la vista de filtros si es necesario
    this.router.navigate(['/home/filters']);
  }

  resetFilter(){
    this.priceMin = 0;
    this.priceMax = 0;
    this.ratingFilter = 0;
    this.hoverStars = 0;
    this.difficultyFilter = '';  // Puedes ajustar los valores predeterminados si son diferentes
    this.typeFilter = '';     // Ajusta según el valor predeterminado de tu filtro
    this.searchTerm = '';

    this.filteredRoutes = this.routes;
    this.router.navigate(['/home/routes']);
  }

  applySearchFilter(route: any): boolean {
    if (!this.searchTerm) return true;
    return route.name.toLowerCase().includes(this.searchTerm.toLowerCase());
  }

  applyPriceFilter(route: Route): boolean {
    const price = route.price || 0; // Si no tiene precio, usar 0
    return (!this.priceMin || price >= this.priceMin) && (!this.priceMax || price <= this.priceMax);
  }

  applyRatingFilter(route: any): boolean {
    if (!this.ratingFilter) return true;
    return route.score >= this.ratingFilter;
  }

  applyDifficultyFilter(route: any): boolean {
    if (!this.difficultyFilter) return true;
    return route.dificult.toLowerCase() === this.difficultyFilter.toLowerCase();
  }

  applyTypeFilter(route: any): boolean {
    if (!this.typeFilter) return true;
    return route.typeRoute.toLowerCase() === this.typeFilter.toLowerCase();
  }

  onLogOut(): void {
    this.authService.logOut();
    console.log("se cerro la sesion")
  }
}
