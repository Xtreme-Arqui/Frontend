import { Component, OnInit } from '@angular/core';
import { Route } from '../../models/route.model';
import { RouteService } from '../../services/route.service';

@Component({
  selector: 'app-publications',
  templateUrl: './publications.component.html',
  styleUrl: './publications.component.css'
})
export class PublicationsComponent implements OnInit{
  routes: Route[] = [];
  Math = Math;

  constructor(private RouteService: RouteService){}

  ngOnInit(): void {
    this.getRoutes();
  }

  getRoutes(): void {
    this.RouteService.getRoutes().subscribe(
      (data) => {
        this.routes = data;
        console.log(this.routes);
      }
    )
  }

  

}
