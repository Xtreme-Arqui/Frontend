import { Component, OnInit } from '@angular/core';
import { TouristService } from '../../services/tourist.service';
import { Tourist } from '../../models/tourist.model';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../access/services/auth.service';

@Component({
  selector: 'app-account-adventurer',
  templateUrl: './account-adventurer.component.html',
  styleUrl: './account-adventurer.component.css'
})
export class AccountAdventurerComponent implements OnInit{
  touristForm: FormGroup;
  tourist!: Tourist;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private touristService: TouristService
  ) {
    this.touristForm = this.formBuilder.group({
      photo: [''],
      email: [''],
      password: ['']
    })
  }

  ngOnInit(): void {
    this.tourist = this.authService.getUser();
    this.loadData();
  }

  loadData() {
    if(this.tourist) {
      this.touristForm.patchValue({
        photo: this.tourist.photo,
        email: this.tourist.email,
        password: this.tourist.password
      })
    }
  }

  updateData(event: Event){
    event.preventDefault();
    
    const updatedTourist = {
      id: this.tourist.id,
      name: this.tourist.name,
      lastName: this.tourist.lastName,
      email: this.touristForm.get('email')?.value,
      password: this.touristForm.get('password')?.value,
      phoneNumber: this.tourist.phoneNumber,
      address: this.tourist.address,
      photo: this.touristForm.get('photo')?.value,
    }

    this.touristService.updateTourists(this.tourist.id, updatedTourist).subscribe({
      next: () => {
        this.authService.setUser(updatedTourist);
        console.log('Agencia actualizada:', updatedTourist);
        this.router.navigate(['/profile/account']);
      },
      error: (error) => console.error('Error al actualiza la agencia: ', error),
    })
  }
}