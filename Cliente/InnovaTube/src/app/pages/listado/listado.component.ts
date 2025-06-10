import { Component } from '@angular/core';
import { ListadoBusquedaComponent } from '../../shared/components/listado-busqueda/listado-busqueda.component';

@Component({
  selector: 'app-listado',
  standalone: true,
  imports: [ListadoBusquedaComponent],
  templateUrl: './listado.component.html',
  styleUrl: './listado.component.css'
})
export class ListadoComponent {

}
