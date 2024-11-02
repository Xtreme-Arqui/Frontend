import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RouteService } from '../../../agency/services/route.service';
import { Route } from '../../../agency/models/route.model';
import { Review } from '../../models/review.model';
import { ReviewService } from '../../services/review.service';
import { Tourist } from '../../models/tourist.model';
import { TouristService } from '../../services/tourist.service';
import { AuthService } from '../../../access/services/auth.service';

@Component({
  selector: 'app-package',
  templateUrl: './package.component.html',
  styleUrl: './package.component.css'
})
export class PackageComponent implements OnInit{
  routeId: string | null = null;
  route!: any;
  touristId: any;
  tourist!: Tourist;
  mainImage: string = '';
  hoverStars: number = 0;
  ratingFilter: number = 0;
  reviews: Review [] = [];
  comment: string = '';
  agencyId: any;

  constructor(
    private activateRoute: ActivatedRoute, 
    private routeService: RouteService, 
    private reviewService: ReviewService,
    private touristService: TouristService,
    private router: Router,
    private authService: AuthService) { 
      this.touristId = this.authService.getUserId();
      this.activateRoute.paramMap.subscribe(params => {
        this.routeId = params.get('id'); // El valor de 'id'
        console.log('ID recibido:', this.routeId);
      });
    }

  ngOnInit(): void {

    this.routeService.getRouteById(this.routeId).subscribe(
      (data) => {
        this.route = data;
        this.agencyId = data.agency.id;
        console.log(data.agency.id)
        this.mainImage = this.route.photos[0];
        if(this.agencyId){
          this.getReviewsByAgency();
        }
      })
    
    this.getTouristById();
  }

  getTouristById(){
    this.touristService.getTouristsById(this.touristId).subscribe(
      (data) => {
        this.tourist = data;
        console.log(this.tourist);
      }
    )
  }
  
  getReviewsByAgency(){
    this.reviewService.getReviewsByAgency(this.agencyId).subscribe(
      (data) => {
        this.reviews = data.content || [];
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

  formatDate(date: Date): string {
    const months: string[] = [
        "enero", "febrero", "marzo", "abril", "mayo", "junio", 
        "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"
    ];
    const day: number = date.getDate();
    const month: string = months[date.getMonth()];
    const year: number = date.getFullYear();
    return `${day} de ${month} de ${year}`;
  }  

  calculateAverageScore(): number {
    if (this.reviews.length === 0) {
      console.log("No hay reviews disponibles para calcular el score.")
        return 0; // Evitar división por cero
    }

    const totalScore = this.reviews.reduce((sum, review) => sum + review.score, 0);
    const averageScore = totalScore / this.reviews.length;
    console.log("el resultado es: ", averageScore)
    return averageScore;
}

  updateRoute() {
    const updatedRoute = {
      altMax: this.route.altMax,
      altMin: this.route.altMin,
      description: this.route.description,
      difficult: this.route.difficult,
      distance: this.route.distance,
      id: this.route.id,
      location: this.route.location,
      name: this.route.name,
      photos: this.route.photos,
      price: this.route.price,
      score: this.calculateAverageScore(),
      typeRoute: this.route.typeRoute,
      agencyId: this.route.agency.id,
      agency: this.route.agency
    }

    this.routeService.updateRoute(this.agencyId ,this.routeId, updatedRoute).subscribe({
      next: () => {
        console.log('Ruta actualizada:', updatedRoute);
        this.router.navigate(['/home/package/' + this.routeId]);
      },
      error: (error) => console.error('Error al actualizar la ruta:', error),
    });
  }

  submitComment() {
    const currentDate: Date = new Date();
    const formattedDate: string = this.formatDate(currentDate);

    const newReview = {
      id: '',
      agencyId: this.agencyId,
      touristId: this.touristId,
      date: formattedDate,
      score: this.ratingFilter, 
      comment: this.comment 
    }

    if (this.comment.trim() !== '' && this.ratingFilter > 0) {
      this.reviewService.createReview(this.agencyId, this.touristId,newReview).subscribe(
        (createdReview: Review) => {
          // Agrega el comentario al inicio de la lista de reseñas
          this.reviews.unshift(createdReview);
          console.log("se creo correctamente");
          // Limpia el campo de comentario y la calificación
          this.comment = '';
          this.ratingFilter = 0;
          this.hoverStars = 0;
          this.updateRoute();
        },
        error => {
          console.log("Ocurrió un error al agregar el usuario", error);
        }
      );
    }
  }

}
