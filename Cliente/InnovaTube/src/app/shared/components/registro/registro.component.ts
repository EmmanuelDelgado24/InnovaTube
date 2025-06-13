import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http'; 

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css',
})
export class RegistroComponent {
  fr = inject(FormBuilder);
  hashError = signal(false);
  isPosting = signal(false);
  router = inject(Router);

  authService = inject(AuthService);

  registerForm = this.fr.group({
    nameCompleto: ['', [Validators.required]], 
    nameUser: ['', [Validators.required]], 
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });

  onSubmit() {
    this.isPosting.set(true);
    this.hashError.set(false);

    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      this.isPosting.set(false);

      this.hashError.set(true); // Usamos el genérico para validación también
      setTimeout(() => {
        this.hashError.set(false);
      }, 3000); // Dar tiempo para leer la validación
      return;
    }

    const {
      nameCompleto = '',
      nameUser = '',
      email = '',
      password = '',
    } = this.registerForm.value;

    this.authService
      .register(nameCompleto!, nameUser!, email!, password!)
      .subscribe({
        next: (isRegistered) => {
          this.isPosting.set(false);
          if (isRegistered) {
            console.log('Registro exitoso!');
            this.router.navigateByUrl('/login');
          } else {
            // es para cuando el servicio devuelve 'false' 
            this.hashError.set(true);
            setTimeout(() => {
              this.hashError.set(false);
            }, 3000); // Aumenta el tiempo para que se vea
          }
        },
        error: (err: HttpErrorResponse) => { // ¡Correcto!
          this.isPosting.set(false);
          console.error('Error en la API de registro:', err);
          
          this.hashError.set(true);
          setTimeout(() => {
            this.hashError.set(false);
          }, 4000); // Dar más tiempo para leer el error específico
        } 
      }); 
  } 
}