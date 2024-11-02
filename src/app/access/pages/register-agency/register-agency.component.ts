import { Component } from '@angular/core';
import { AgencyService } from '../../../agency/services/agency.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-agency',
  templateUrl: './register-agency.component.html',
  styleUrl: './register-agency.component.css'
})
export class RegisterAgencyComponent {
  agencyForm: FormGroup;
  fakeId!: string;

  constructor(
    private agencyService: AgencyService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.agencyForm = this.formBuilder.group({
      name: [''],
      email: [''],
      password: [''],
      phoneNumber: [''],
      description: [''],
      location: [''],
      ruc: [''],
      photo: [''],
      score: [''],
      linkF: [''],
      linkW: [''],
      linkI: [''],
      linkT: [''],
    })
  }

  saveData(event: Event){
    event.preventDefault();

    this.agencyService.getAgencies().subscribe(data => {
      this.fakeId = (data.length + 1).toString(); // Asegúrate de que fakeId sea un string si es necesario
      console.log(this.fakeId);

      const newAgency = {
        id: this.fakeId,
        name: this.agencyForm.get('name')?.value,
        email: this.agencyForm.get('email')?.value,
        password: this.agencyForm.get('password')?.value,
        phoneNumber: this.agencyForm.get('phoneNumber')?.value,
        description: this.agencyForm.get('description')?.value,
        location: this.agencyForm.get('location')?.value,
        ruc: this.agencyForm.get('ruc')?.value,
        photo: this.agencyForm.get('photo')?.value,
        score: this.agencyForm.get('score')?.value,
        linkF: this.agencyForm.get('linkF')?.value,
        linkW: this.agencyForm.get('linkW')?.value,
        linkI: this.agencyForm.get('linkI')?.value,
        linkT: this.agencyForm.get('linkT')?.value,
      };

      this.agencyService.addAgency(newAgency).subscribe({
        next: () => {
          console.log('Agencia creado:', newAgency);
          this.router.navigate(['/access']);
        },
        error: (error) => console.error('Error al agregar el turista: ', error),
      })
    })
  }
}
