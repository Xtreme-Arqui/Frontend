import { Component, OnInit } from '@angular/core';
import { RouteService } from '../../services/route.service';
import { ActivatedRoute } from '@angular/router';
import { Route } from '../../models/route.model';

@Component({
  selector: 'app-route-detail',
  templateUrl: './route-detail.component.html',
  styleUrl: './route-detail.component.css'
})
export class RouteDetailComponent implements OnInit {
  routeId: string | null = null;
  route!: Route;
  mainImage: string = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private routeService: RouteService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      this.routeId = params.get('id'); // El valor de 'id'
      console.log('ID recibido:', this.routeId);
    });

    this.routeService.getRouteById(this.routeId).subscribe(
      (data) => {
        this.route = data;
        this.mainImage = this.route.photos[0];
      }
    )
  }

  changeMainImage(image: string) {
    this.mainImage = image;
  }


}
