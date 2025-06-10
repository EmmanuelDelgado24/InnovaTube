import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-listado-busqueda',
  standalone: true,
  imports: [],
  templateUrl: './listado-busqueda.component.html',
  styleUrl: './listado-busqueda.component.css'
})
export class ListadoBusquedaComponent {
  title = 'web-app';

  ngOnInit(): void {
    initFlowbite();
  }
}
