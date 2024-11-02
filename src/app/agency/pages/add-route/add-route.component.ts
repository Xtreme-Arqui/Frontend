import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { RouteService } from '../../services/route.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-route',
  templateUrl: './add-route.component.html',
  styleUrls: ['./add-route.component.css']
})
export class AddRouteComponent implements OnInit{
  routeForm: FormGroup;

  constructor(
    private routeService: RouteService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
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
    
  }

  // Obtener los controles del FormArray de fotos
  get photos() {
    return this.routeForm.get('photos') as FormArray;
  }

  // Añadir un nuevo campo de URL al FormArray
  addPhotoUrl(): void {
    const photoGroup = this.formBuilder.group({
      url: ['']
    });
    this.photos.push(photoGroup);
  }

  // Eliminar un campo de URL específico del FormArray
  removePhotoUrl(index: number): void {
    this.photos.removeAt(index);
  }

  saveData(event: Event){
    event.preventDefault();
    const newRoute = {
      id: '',
      agencyId: '',
      name: this.routeForm.get('name')?.value,
      description: this.routeForm.get('description')?.value,
      score: '',
      price: this.routeForm.get('price')?.value,
      creationDate: '',
      distance: this.routeForm.get('distance')?.value,
      difficult: this.routeForm.get('difficult')?.value,
      altMax: this.routeForm.get('altMax')?.value,
      altMin: this.routeForm.get('altMin')?.value,
      typeRoute: this.routeForm.get('typeRoute')?.value,
      photos: this.routeForm.value.photos.map((photo: { url: string }) => photo.url) // Extrae solo las URLs
    };

    this.routeService.addRoute(newRoute).subscribe(
      response => {
        console.log('Nueva ruta añadidad: ', response);
      },
      error => {
        console.error('Error al añadir la ruta: ', error);
      }
    )
    this.router.navigate(['/home/services']);
  }
}
