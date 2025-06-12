import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

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
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });

  onSubmit() {
    if (this.registerForm.invalid) {
      this.hashError.set(true);
      setTimeout(() => {
        this.hashError.set(false);
      }, 2000);
      return;
    }
  
  const { email = '', password = ''} = this.registerForm.value

  this.authService
   .login(email!, password!)
   .subscribe((isAuthenticated) => {
    if(isAuthenticated){
      this.router.navigateByUrl('/login')
      return;
    }
    this.hashError.set(true);
    setTimeout(()=>{
      this.hashError.set(false);
    }, 2000)
   })
  }
}
