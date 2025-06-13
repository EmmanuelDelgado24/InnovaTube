import { Component, Input } from '@angular/core';
import { OnInit, SimpleChanges, OnChanges } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { YoutubeService} from '../../../services/youtube.service';
import {ListadoResponse, Item} from '../../interfaces/lista.interfaces';
import { FormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common'; //necesario para componentes independientes
import { FavoritosService } from '../../../services/favorite.service';

@Component({
  selector: 'app-listado-busqueda',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './listado-busqueda.component.html',
  styleUrl: './listado-busqueda.component.css',
})
export class ListadoBusquedaComponent implements OnInit, OnChanges{
  @Input() searchTerm: string = 'default'; 
  videos: Item[] = [];
  searchResponse: ListadoResponse | null = null;
  loading = false;
  error = '';
  
  constructor(
    private youtubeService: YoutubeService,
    private favoritosService: FavoritosService
  ) { }

  ngOnInit(): void {
    initFlowbite();
    //this.search();
  }

  //search(): void {
  //  this.youtubeService.searchVideos(this.searchTerm).subscribe(
  //    (data) => {
  //      this.videos = data.items; // La estructura de la respuesta de YouTube
  //      console.log('Videos:', this.videos);
  //    },
  //    (error) => {
  //      console.error('Error al obtener videos:', error);
  //    }
  //  );
  //}
  

   // Se ejecuta cuando cambia el @Input()
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['searchTerm'] && !changes['searchTerm'].firstChange) {
      this.search(); // Buscar cuando cambie el término
    }
  }

  search(): void {
    if (!this.searchTerm || this.searchTerm.trim() === '') {
      this.videos = [];
      return;
    }

    this.loading = true;
    this.error = '';
    
    this.youtubeService.searchVideos(this.searchTerm).subscribe({
      next: (response) => {
        this.searchResponse = response;
        this.videos = response.items || [];
        this.loading = false;
        console.log('Videos cargados:', this.videos.length);
      },
      error: (err) => {
        this.error = 'Error al cargar videos de YouTube';
        this.loading = false;
        console.error('Error completo:', err);
      }
    });
  }

  isFavorito(videoId: string): boolean {
    return this.favoritosService.isFavorito(videoId);
  }

  //
  Favorito(video: Item): void {
    this.favoritosService.Favorito(video);
  }


  // Método para abrir video
  openVideo(videoId: string): void {
    const url = `https://www.youtube.com/watch?v=${videoId}`;
    window.open(url, '_blank');
  }

  // Método para recargar
  reload(): void {
    this.search();
  }
}
