import { Component, OnInit } from '@angular/core';
import { TouristService } from '../../services/tourist.service';
import { Tourist } from '../../models/tourist.model';
import { FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-data-adventurer',
  templateUrl: './data-adventurer.component.html',
  styleUrl: './data-adventurer.component.css'
})
export class DataAdventurerComponent implements OnInit{
  touristId: number = 1;
  tourist!: Tourist;

  constructor(private touristService: TouristService, private http: HttpClient) {
    //this.user_now = this.auth.getUser()
  }

  name = new FormControl('', [Validators.required]);
  lastName = new FormControl('', [Validators.required]);
  address = new FormControl('', [Validators.required]);
  phoneNumber = new FormControl('', [Validators.required]);
  email = new FormControl('', [Validators.required]);

  terms = new FormControl(false, [Validators.requiredTrue]);
  termsError = false;

  ngOnInit(): void {
    this.getTouristById();
    if (this.tourist) {
      this.name.setValue(this.tourist.name);
      this.lastName.setValue(this.tourist.lastName);
      this.address.setValue(this.tourist.address);
      this.phoneNumber.setValue(this.tourist.phoneNumber);
    }
    
  }

  getTouristById(){
    this.touristService.getTouristsById(this.touristId).subscribe(
      (data) => {
        this.tourist = data;
        console.log(this.tourist);
      }
    )
  }

  updateData(){
    const nameValue = this.name.value;
    const lastnameValue = this.lastName.value;
    const addressValue = this.address.value;
    const phoneNumberValue = this.phoneNumber.value;

    if(this.name.invalid || this.lastName.invalid){
      this.name.markAsTouched();
      this.lastName.markAsTouched();
      this.address.markAsTouched();
      this.phoneNumber.markAsTouched();
      return;
    }

    const updatedItem = {
      id: this.tourist.id,
      name: nameValue,
      lastName: lastnameValue,
      email: addressValue,
      password: phoneNumberValue,
      phoneNumber: this.tourist.phoneNumber,
      address: this.tourist.address,
      photo: this.tourist.photo,
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
