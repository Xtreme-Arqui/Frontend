import { Component, OnInit } from '@angular/core';
import { TouristService } from '../../services/tourist.service';
import { Tourist } from '../../models/tourist.model';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../access/services/auth.service';

@Component({
  selector: 'app-data-adventurer',
  templateUrl: './data-adventurer.component.html',
  styleUrl: './data-adventurer.component.css'
})
export class DataAdventurerComponent implements OnInit{
  touristForm: FormGroup;
  tourist!: Tourist;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private touristService: TouristService
  ) {
    this.touristForm = this.formBuilder.group({
      name: [''],
      lastName: [''],
      address: [''],
      phoneNumber: ['']
    })
  }

  ngOnInit(): void {
    this.tourist = this.authService.getUser();
    this.loadData();
  }

  loadData(): void {
    if(this.tourist) {
      this.touristForm.patchValue({
        name: this.tourist.name,
        lastName: this.tourist.lastName,
        address: this.tourist.address,
        phoneNumber: this.tourist.phoneNumber
      })
    }
  }
  updateData(event: Event): void{
    event.preventDefault();

    const updatedTourist = {
      id: this.tourist.id,
      name: this.touristForm.get('name')?.value,
      lastName: this.touristForm.get('lastName')?.value,
      email: this.tourist.email,
      password: this.tourist.password,
      phoneNumber: this.touristForm.get('phoneNumber')?.value,
      address: this.touristForm.get('address')?.value,
      photo: this.tourist.photo,
    }

    this.touristService.updateTourists(this.tourist.id, updatedTourist).subscribe({
      next: () => {
        this.authService.setUser(updatedTourist);
        this.router.navigate(['/profile/data']);
      },
      error: (error) => console.error('Error al actualiza la agencia: ', error),
    })
  }
}
