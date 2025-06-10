import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LayoutComponent } from '../../../shared/layouts/layout/layout.component';
import { RegistroComponent } from '../../../shared/components/registro/registro.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterOutlet, LayoutComponent, RegistroComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

}
