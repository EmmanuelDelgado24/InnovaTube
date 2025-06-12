import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-iniciar-sesion',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './iniciar-sesion.component.html',
  styleUrl: './iniciar-sesion.component.css'
})
export class IniciarSesionComponent {
  fr = inject(FormBuilder);
  hashError = signal(false);
  isPosting = signal(false);
  router = inject(Router);

  authService = inject(AuthService)

  loginForm = this.fr.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]]
  });

  onSubmit(){
   if(this.loginForm.invalid){
    this.hashError.set(true);
    setTimeout(()=>{
      this.hashError.set(false);
    }, 2000)
    return;    
   } 

   const { email = '', password = ''} = this.loginForm.value

   this.authService
   .login(email!, password!)
   .subscribe((isAuthenticated) => {
    if(isAuthenticated){
      this.router.navigateByUrl('/listado')
      return;
    }
    this.hashError.set(true);
    setTimeout(()=>{
      this.hashError.set(false);
    }, 2000)
   })
  }
}
