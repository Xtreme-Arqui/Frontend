import { Component, Input, OnInit } from '@angular/core';
import { Route } from '../../../agency/models/route.model';
import { RouteService } from '../../../agency/services/route.service';

@Component({
  selector: 'app-routes',
  templateUrl: './routes.component.html',
  styleUrl: './routes.component.css'
})
export class RoutesComponent implements OnInit{
  routes: Route [] = [];
  

  constructor(private RouteService: RouteService) {}

  ngOnInit(): void {
    this.getRoutes();
  }

  getRoutes(): void {
    this.RouteService.getRoutes().subscribe(
      (data) => {
        this.routes = data.content || [];
        console.log(this.routes);
      }
    )
  }
}
