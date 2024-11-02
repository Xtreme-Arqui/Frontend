import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TouristService } from '../../../adventurer/services/tourist.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-tourist',
  templateUrl: './register-tourist.component.html',
  styleUrl: './register-tourist.component.css'
})
export class RegisterTouristComponent {
  touristForm: FormGroup;
  fakeId!: string;

  constructor(
    private touristService: TouristService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.touristForm = this.formBuilder.group({
      name: [''],
      lastName: [''],
      email: [''],
      password: [''],
      phoneNumber: [''],
      address: [''],
      photo: [''],
      })
  }

  saveData(event: Event){
    event.preventDefault();

    this.touristService.getTourists().subscribe(data => {
      this.fakeId = (data.length + 1).toString(); // Asegúrate de que fakeId sea un string si es necesario
      console.log(this.fakeId);
  
      // Crea el nuevo turista con el fakeId generado
      const newTourist = {
        id: this.fakeId,
        name: this.touristForm.get('name')?.value,
        lastName: this.touristForm.get('lastName')?.value,
        email: this.touristForm.get('email')?.value,
        password: this.touristForm.get('password')?.value,
        phoneNumber: this.touristForm.get('phoneNumber')?.value,
        address: this.touristForm.get('address')?.value,
        photo: this.touristForm.get('photo')?.value,
      };
  
      // Agrega el nuevo turista después de obtener el fakeId
      this.touristService.addTourist(newTourist).subscribe({
        next: () => {
          console.log('Turista creado:', newTourist);
          this.router.navigate(['/access']);
        },
        error: (error) => console.error('Error al agregar el turista: ', error),
      });
    });
  }
}
