import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RouteService } from '../../../agency/services/route.service';
import { Route } from '../../../agency/models/route.model';
import { Review } from '../../models/review.model';
import { ReviewService } from '../../services/review.service';
import { Tourist } from '../../models/tourist.model';
import { TouristService } from '../../services/tourist.service';

@Component({
  selector: 'app-package',
  templateUrl: './package.component.html',
  styleUrl: './package.component.css'
})
export class PackageComponent implements OnInit{
  routeId: string | null = null;
  route!: Route;
  touristId: number = 1;
  tourist!: Tourist;
  mainImage: string = '';
  hoverStars: number = 0;
  ratingFilter: number = 0;
  reviews: Review [] = [];
  comment: string = '';

  constructor(
    private activateRoute: ActivatedRoute, 
    private routeService: RouteService, 
    private reviewService: ReviewService,
    private touristService: TouristService) { }

  ngOnInit(): void {
    this.activateRoute.paramMap.subscribe(params => {
      this.routeId = params.get('id'); // El valor de 'id'
      console.log('ID recibido:', this.routeId);
    });

    this.getRouteById();
    this.getReviews();
    this.getTouristById();
  }

  getRouteById(){
    this.routeService.getRouteById(this.routeId).subscribe(
      (data) => {
        this.route = data;
        this.mainImage = this.route.photos[0];
      })
  }

  getTouristById(){
    this.touristService.getTouristsById(this.touristId).subscribe(
      (data) => {
        this.tourist = data;
        console.log(this.tourist);
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

  changeMainImage(image: string) {
    this.mainImage = image;
  }

  hoverRating(rating: number) {
    this.hoverStars = rating;
  }

  setRating(rating: number) {
    this.ratingFilter = rating;
  }

  submitComment() {
    const newReview = {
      id: 20,
      agencyId: 1,
      touristId: 1,
      routeId: this.route.id,
      date: "8 de septiembre de 2024",
      score: this.ratingFilter, 
      comment: this.comment 
    }

    if (this.comment.trim() !== '' && this.ratingFilter > 0) {
      this.reviewService.createReview(newReview).subscribe(
        (createdReview: Review) => {
          // Agrega el comentario al inicio de la lista de reseñas
          this.reviews.unshift(createdReview);
          console.log("se creo correctamente");

          // Limpia el campo de comentario y la calificación
          this.comment = '';
          this.ratingFilter = 0;
          this.hoverStars = 0;
        },
        error => {
          console.log("Ocurrió un error al agregar el usuario", error);
        }
      );
    }
  }

}
