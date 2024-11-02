import { Component, OnInit } from '@angular/core';
import { AgencyService } from '../../services/agency.service';
import { Agency } from '../../models/agency.model';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../access/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account-agency',
  templateUrl: './account-agency.component.html',
  styleUrl: './account-agency.component.css'
})
export class AccountAgencyComponent implements OnInit {
  agencyForm: FormGroup;
  agency!: Agency;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private agencyService: AgencyService
  ) {
    this.agencyForm = this.formBuilder.group({
      photo: [''],
      email: [''],
      password: ['']
    })
   }

  ngOnInit(): void {
    this.agency = this.authService.getUser();
    this.loadData();
    
  }

  loadData(): void {
    if(this.agency) {
      this.agencyForm.patchValue({
        photo: this.agency.photo,
        email: this.agency.email,
        password: this.agency.password,
        
      })
    }
  }

  updateData(event: Event): void {
    event.preventDefault();

    const updatedAgency = {
      id: this.agency.id,
      name: this.agency.name,
      email: this.agencyForm.get('email')?.value,
      password: this.agencyForm.get('password')?.value,
      phoneNumber: this.agency.phoneNumber,
      description: this.agency.description,
      location: this.agency.location,
      ruc: this.agency.ruc,
      photo: this.agencyForm.get('photo')?.value,
      score: this.agency.score
    }

    this.agencyService.updateAgency(this.agency.id,updatedAgency).subscribe({
      next: () => {
        this.authService.setUser(updatedAgency);
        console.log('Agencia actualizada:', updatedAgency);
        this.router.navigate(['/home/account']);
      },
      error: (error) => console.error('Error al actualiza la agencia: ', error),
    });
  }

  onLogOut(): void {
    this.authService.logOut();
  }

}
