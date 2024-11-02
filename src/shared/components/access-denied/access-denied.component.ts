import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-access-denied',
  templateUrl: './access-denied.component.html',
  styleUrl: './access-denied.component.css'
})
export class AccessDeniedComponent {
  
  constructor(private router: Router) {}

  goBack() {
    this.router.navigate(['../']); // Ajusta la ruta según sea necesario
  }

}
