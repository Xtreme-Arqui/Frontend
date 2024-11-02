import { AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'], 
})
export class AuthComponent implements AfterViewInit {
  @ViewChild('container') container!: ElementRef;
  isActive = false;
  emailInput: string = ''; 

  constructor (
    private authService: AuthService,
    private router: Router
  ) {}

  ngAfterViewInit(): void {
    // Verifica si el elemento está disponible
    if (!this.container) {
      console.error("Elemento 'container' no está disponible");
    }
  }
  onLogin(email: string, password: string) {
    this.authService.logIn(email,password).subscribe((user) => {
      if (user) {
        if (user.userType === 'adventurer') {
          this.router.navigate(['/home/routes']);
        } else if (user.userType === 'agency') {
          this.router.navigate(['/home/services']);
        }
      } else {
        alert('Credenciales invalidas');
      }
    }, (error) => {
      alert('Error en la autenticacion');
      console.error(error);
    });
  }

  // Método para verificar si el correo ya está registrado
  onEmailCheck(): void {
    console.error(this.emailInput);
    if (this.emailInput.trim() === '') {
      alert('Por favor ingrese un correo electrónico');
      return;
    }

    this.authService.isEmailRegistered(this.emailInput).subscribe((isRegistered) => {
      if (isRegistered) {
        alert('El correo ya está registrado. Por favor use otro correo o inicie sesión.');
      } else {
        this.onRegisterClick(); // Procede al siguiente paso del registro si el correo no está registrado
      }
    }, (error) => {
      console.error('Error al verificar el correo:', error);
      alert('Ocurrió un error al verificar el correo. Por favor intente de nuevo.');
    });
    this.router.navigate(['/select-type'])
  }

  // Método que se ejecuta al hacer clic en el botón de registro
  onRegisterClick(): void {
    if (this.container) {
      this.container.nativeElement.classList.add("active");
      this.isActive = true;
    } else {
      console.error("El contenedor no está definido.");
    }
  }

  // Método que se ejecuta al hacer clic en el botón de login
  onLoginClick(): void {
    if (this.container) {
      this.container.nativeElement.classList.remove("active");
      this.isActive = true;
    } else {
      console.error("El contenedor no está definido.");
    }
  }
}
