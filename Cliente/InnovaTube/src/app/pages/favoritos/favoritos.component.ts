import { Component } from '@angular/core';
import { LayoutComponent } from '../../shared/layouts/layout/layout.component';
import { ToastSuccessfullComponent } from '../../shared/components/toast-successfull/toast-successfull.component';
import { RouterOutlet } from '@angular/router';
import { ListadoFavoritosComponent } from "../../shared/components/listado-favoritos/listado-favoritos.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-favoritos',
  standalone: true,
  imports: [CommonModule, LayoutComponent, ToastSuccessfullComponent, RouterOutlet, ListadoFavoritosComponent],
  templateUrl: './favoritos.component.html',
  styleUrl: './favoritos.component.css'
})
export class FavoritosComponent {
   exito: boolean = false; 
}
