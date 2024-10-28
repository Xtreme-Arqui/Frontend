import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AgencyService } from '../../../agency/services/agency.service';
import { Agency } from '../../../agency/models/agency.model';
import { Route } from '../../../agency/models/route.model';
import { RouteService } from '../../../agency/services/route.service';
import { ReviewService } from '../../services/review.service';
import { Review } from '../../models/review.model';
import { TouristService } from '../../services/tourist.service';
import { Tourist } from '../../models/tourist.model';

@Component({
  selector: 'app-agency',
  templateUrl: './agency.component.html',
  styleUrl: './agency.component.css',
})
export class AgencyComponent implements OnInit {
  agency! : Agency;
  agencyId: string | null = null;
  routes: Route [] = [];
  reviews: Review [] = [];
  touristId: number = 1;
  tourist!: Tourist;
  @ViewChild('cardContainer', { static: true }) cardContainer!: ElementRef;

  constructor (
    private agencyService: AgencyService,
    private routeService: RouteService,
    private reviewService: ReviewService,
    private touristService: TouristService) {}

  ngOnInit(): void {
    this.agencyId = '1' //REMPLAZAR
    this.getAgencyById();
    this.getRoutes();
    this.getReviews();
    this.getTouristById();
  }

  getAgencyById(){
    this.agencyService.getAgencyById(this.agencyId).subscribe(
      (data) => {
        this.agency = data;
        console.log(this.agency)
      }
    )
  }

  getTouristById(){
    this.touristService.getTouristsById(this.touristId).subscribe(
      (data) => {
        this.tourist = data;
        console.log(this.tourist);
      }
    )
  }

  getRoutes(){
    this.routeService.getRoutes().subscribe(
      (data) => {
        this.routes = data;
      }
    )
  }

  getReviews(){
    this.reviewService.getReviews().subscribe(
      (data) => {
        this.reviews = data;
        console.log(this.reviews);
      }
    )
  }

  scrollLeft() {
    const container = this.cardContainer.nativeElement;
  const cardWidth = container.offsetWidth / 3; // ajusta este valor según el tamaño y cantidad de cards visibles
  container.scrollBy({ left: -cardWidth, behavior: 'smooth' });
  }

  scrollRight() {
    const container = this.cardContainer.nativeElement;
  const cardWidth = container.offsetWidth / 3; // ajusta este valor según el tamaño y cantidad de cards visibles
  container.scrollBy({ left: cardWidth, behavior: 'smooth' });
  }

}