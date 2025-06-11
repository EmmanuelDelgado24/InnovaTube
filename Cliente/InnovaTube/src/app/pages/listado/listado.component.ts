import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ListadoBusquedaComponent } from '../../shared/components/listado-busqueda/listado-busqueda.component';
import { LayoutComponent } from '../../shared/layouts/layout/layout.component';
import { ToastSuccessfullComponent } from '../../shared/components/toast-successfull/toast-successfull.component';
import { CommonModule } from '@angular/common';
 
@Component({
  selector: 'app-listado',
  standalone: true,
  imports: [CommonModule, ListadoBusquedaComponent, LayoutComponent, RouterOutlet, ToastSuccessfullComponent],
  templateUrl: './listado.component.html',
  styleUrl: './listado.component.css'
})
export class ListadoComponent {
  exito: boolean = false; 

}
