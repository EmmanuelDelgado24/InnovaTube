import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-iniciar-sesion',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './iniciar-sesion.component.html',
  styleUrl: './iniciar-sesion.component.css'
})
export class IniciarSesionComponent {
  fr = inject(FormBuilder);
  hashError = signal(false);
  isPosting = signal(false);

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

   console.log({email, password});
  }
}
