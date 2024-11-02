import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-select-type',
  templateUrl: './select-type.component.html',
  styleUrl: './select-type.component.css'
})
export class SelectTypeComponent {

  constructor(private router: Router) {}

  goToRegisterAgency() {
    this.router.navigate(['/register-agency']);
  }

  goToRegisterTourist() {
    this.router.navigate(['/register-tourist']);
  }
}
