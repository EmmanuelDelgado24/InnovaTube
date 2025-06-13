import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavoritosService } from '../../../services/favorite.service';
import { Item } from '../../interfaces/lista.interfaces';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-listado-favoritos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './listado-favoritos.component.html',
  styleUrl: './listado-favoritos.component.css',
})
export class ListadoFavoritosComponent implements OnInit {
  favoritosVideos: Item[] = [];

  constructor(private favoritosService: FavoritosService) {}

  ngOnInit(): void {
    initFlowbite(); 
    this.loadFavorites();
  }

  loadFavorites(): void {
    this.favoritosVideos = this.favoritosService.getFavoritos();
  }

  removeFavorite(videoId: string): void {
    this.favoritosService.Favorito({ id: { videoId: videoId } } as Item); 
    this.loadFavorites(); 
  }

  openVideo(videoId: string): void {
    const url = `https://www.youtube.com/watch?v=${videoId}`;
    window.open(url, '_blank');
  }
}
