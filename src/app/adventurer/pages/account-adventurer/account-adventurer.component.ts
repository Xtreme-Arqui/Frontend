import { Component, OnInit } from '@angular/core';
import { TouristService } from '../../services/tourist.service';
import { Tourist } from '../../models/tourist.model';
import { AbstractControl, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-account-adventurer',
  templateUrl: './account-adventurer.component.html',
  styleUrl: './account-adventurer.component.css'
})
export class AccountAdventurerComponent implements OnInit{
  touristId: number = 1;
  tourist!: Tourist;
  imageUrl!: string;

  constructor(private touristService: TouristService) {
    //this.user_now = this.auth.getUser()
  }

  photo = new FormControl('', [Validators.required]);
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required]);


  ngOnInit(): void {
    this.getTouristById();

  }

  getTouristById(){
    this.touristService.getTouristsById(this.touristId).subscribe(
      (data) => {
        this.tourist = data;
        console.log(this.tourist);
        this.imageUrl = this.tourist.photo;
        this.photo.setValue(this.tourist.photo);
        this.email.setValue(this.tourist.email);
        this.password.setValue(this.tourist.password);
      }
    )
  }

  passwordMatchValidator(control: AbstractControl) {
    const password = control.get('password')?.value;
    const repeatPassword = control.get('repeatPassword')?.value;
    return password === repeatPassword ? null : { passwordMismatch: true };
  }

  updateData(){
    const photoValue = this.photo.value;
    const emailValue = this.email.value;
    const passwordValue = this.password.value;

    if(this.email.invalid || this.password.invalid){
      this.photo.markAsTouched();
      this.email.markAsTouched();
      this.password.markAsTouched();
      return;
    }

    const updatedItem = {
      id: this.tourist.id,
      name: this.tourist.name,
      lastName: this.tourist.lastName,
      email: emailValue,
      password: passwordValue,
      phoneNumber: this.tourist.phoneNumber,
      address: this.tourist.address,
      photo: photoValue,
    }

    this.touristService.updateTourists(1,updatedItem).subscribe(
      (res) => {
        console.log(updatedItem)
        console.log("Usuario actualizado exitosamente");
      },
      (error) => {
        console.log("Ocurrió un error al actualizar el usuario");
        console.log(error);
      }
    );
  }
}