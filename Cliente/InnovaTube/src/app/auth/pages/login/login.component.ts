import { Component } from '@angular/core';
import { LayoutComponent } from '../../../shared/layouts/layout/layout.component';
import { RouterOutlet } from '@angular/router';
import { IniciarSesionComponent } from '../../../shared/components/iniciar-sesion/iniciar-sesion.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [LayoutComponent, RouterOutlet, IniciarSesionComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

}
