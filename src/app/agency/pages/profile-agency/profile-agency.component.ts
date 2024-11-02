import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Agency } from '../../models/agency.model';
import { AgencyService } from '../../services/agency.service';
import { Router } from '@angular/router';
import { AuthService } from '../../../access/services/auth.service';

@Component({
  selector: 'app-profile-agency',
  templateUrl: './profile-agency.component.html',
  styleUrl: './profile-agency.component.css'
})
export class ProfileAgencyComponent implements OnInit{
  agencyForm: FormGroup;
  agency!: Agency;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private agencyService: AgencyService
  ) {
    this.agencyForm = this.formBuilder.group({
      name: [''],
      ruc: [''],
      phoneNumber: [''],
      location: [''],
      linkF: [''],
      linkW: [''],
      linkI: [''],
      linkT: [''],
      description: ['']
    })
  }

  ngOnInit(): void {
    this.agency = this.authService.getUser();
    this.loadData();
  }

  loadData(): void {
    if(this.agency) {
      this.agencyForm.patchValue({
        name: this.agency.name,
        ruc: this.agency.ruc,
        phoneNumber: this.agency.phoneNumber,
        location: this.agency.location,
        linkF: this.agency.linkF,
        linkW: this.agency.linkW,
        linkI: this.agency.linkI,
        linkT: this.agency.linkT,
        description: this.agency.description,
      })
    }
  }

  saveData(event: Event): void {
    event.preventDefault();

    const updateAgency = {
      id: this.agency.id,
      name: this.agencyForm.get('name')?.value,
      email: this.agency.email,
      password: this.agency.password,
      phoneNumber: this.agencyForm.get('phoneNumber')?.value,
      description: this.agencyForm.get('description')?.value,
      location: this.agencyForm.get('location')?.value,
      ruc: this.agencyForm.get('ruc')?.value,
      photo: this.agency.photo,
      score: this.agency.score,
      linkF: this.agencyForm.get('linkF')?.value,
      linkW: this.agencyForm.get('linkW')?.value,
      linkI: this.agencyForm.get('linkI')?.value,
      linkT: this.agencyForm.get('linkT')?.value
    }

    this.agencyService.updateAgency(this.agency.id, updateAgency).subscribe({
      next: () => {
        this.authService.setUser(updateAgency);
        console.log('Agencia actualizada:', updateAgency);
        this.router.navigate(['/home/profile']);
      },
      error: (error) => console.error('Error al actualiza la agencia: ', error),
    })
  }

}
