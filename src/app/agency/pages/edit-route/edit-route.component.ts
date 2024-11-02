import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { RouteService } from '../../services/route.service';
import { Route } from '../../models/route.model';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../access/services/auth.service';

@Component({
  selector: 'app-edit-route',
  templateUrl: './edit-route.component.html',
  styleUrl: './edit-route.component.css'
})
export class EditRouteComponent implements OnInit {
  routeId: string | null = null;
  agencyId: any;
  routeForm: FormGroup;
  route!: Route;

  constructor(
    private routeService: RouteService,
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService
  ) {
    this.agencyId = this.authService.getUserId();
    this.routeForm = this.formBuilder.group({
      name: [''],
      description: [''],
      price: [''],
      distance: [''],
      difficult: [''],
      altMax: [''],
      altMin: [''],
      typeRoute: [''],
      photos: this.formBuilder.array([])
    });
  }

  ngOnInit(): void {
    this.routeId = this.activatedRoute.snapshot.paramMap.get('id');
    console.log(this.routeId);
    this.loadRouteData();
  }

  loadRouteData(): void {
    if (this.routeId) {
      this.routeService.getRouteById(this.routeId).subscribe(
        (data: Route) => {
          this.route = data;

          this.routeForm.patchValue({
            name: data.name,
            description: data.description,
            price: data.price,
            distance: data.distance,
            difficult: data.difficult,
            altMax: data.altMax,
            altMin: data.altMin,
            typeRoute: data.typeRoute,
          })

          if (Array.isArray(data.photos)) {
            data.photos.forEach((photoUrl: string) => {
              const photoGroup = this.formBuilder.group({
                url:[photoUrl]
              })
              this.photos.push(photoGroup);
              }
            )
          } else {
            console.error('Photos no es un arreglo: ', data.photos);
          }
        },
        error => console.error('Error al cargae los datos: ', error)
      )
    }
  }

  get photos(): FormArray {
    return this.routeForm.get('photos') as FormArray;
  }

  addPhotoUrl(): void {
    const photoGroup = this.formBuilder.group({
      url: ['']
    });
    this.photos.push(photoGroup);
  }

  removePhotoUrl(index: number): void {
    this.photos.removeAt(index);
  }

  saveData(event: Event): void{
    event.preventDefault();
    
    const updatedRoute = {
      id: this.route.id,
      agencyId: this.route.agencyId,
      name: this.routeForm.get('name')?.value,
      description: this.routeForm.get('description')?.value,
      score: this.route.score,
      price: this.routeForm.get('price')?.value,
      distance: this.routeForm.get('distance')?.value,
      difficult: this.routeForm.get('difficult')?.value,
      altMax: this.routeForm.get('altMax')?.value,
      altMin: this.routeForm.get('altMin')?.value,
      typeRoute: this.routeForm.get('typeRoute')?.value,
      photos: this.routeForm.value.photos.map((photo: { url: string }) => photo.url)
    }

    // Llama al servicio para actualizar la ruta
    this.routeService.updateRoute(this.agencyId ,this.routeId, updatedRoute).subscribe({
      next: () => {
        console.log('Ruta actualizada:', updatedRoute);
        this.router.navigate(['/home/route-detail/' + this.routeId]);
      },
      error: (error) => console.error('Error al actualizar la ruta:', error),
    });
  }
}
