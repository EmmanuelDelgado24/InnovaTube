import { Component, inject} from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
   // Inyectamos el AuthService. Lo hacemos público para que la plantilla HTML pueda acceder a él.
  public authService = inject(AuthService);

  constructor() { } // El constructor puede estar vacío si solo usas inject()

  onLogout(): void {
    this.authService.logout(); // Llama al método logout de tu servicio
  }
}
