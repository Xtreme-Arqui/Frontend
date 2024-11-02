import { Component, OnInit } from '@angular/core';
import { Route } from '../../models/route.model';
import { RouteService } from '../../services/route.service';
import { AuthService } from '../../../access/services/auth.service';

@Component({
  selector: 'app-publications',
  templateUrl: './publications.component.html',
  styleUrl: './publications.component.css'
})
export class PublicationsComponent implements OnInit{
  routes: Route[] = [];
  Math = Math;
  agencyId: any;

  constructor(
    private routeService: RouteService, 
    private authService: AuthService
  ){
    this.agencyId = this.authService.getUserId();
    }

  ngOnInit(): void {
    this.getRoutes();
  }

  getRoutes(): void {
    this.routeService.getRoutesByAgency(this.agencyId).subscribe(
      (data) => {
        this.routes = data.content || [];
        console.log(this.routes);
      }
    )
  }

  

}
