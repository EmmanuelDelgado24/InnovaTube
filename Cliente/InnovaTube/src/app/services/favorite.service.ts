import { Injectable } from '@angular/core';
import { Item } from '../shared/interfaces/lista.interfaces';

@Injectable({
  providedIn: 'root',
})
export class FavoritosService {
  private favoritosKey = 'youtubeFavorites';

  constructor() {}

  getFavoritos(): Item [] {
    const favoritos = localStorage.getItem(this.favoritosKey);
    return favoritos ? JSON.parse(favoritos) : [];
  }

  isFavorito(videoId: string): boolean {
    const favoritos = this.getFavoritos(); // Call getFavoritos
    return favoritos.some((video) => video.id.videoId === videoId);
  }
  private addFavorito(video: Item): void {
    const favorites = this.getFavoritos();
    if (!this.isFavorito(video.id.videoId)) {
      favorites.push(video);
      localStorage.setItem(this.favoritosKey, JSON.stringify(favorites)); // Use favoritosKey
      console.log('Video añadido a favoritos:', video.snippet.title);
    }
  }

  private removeFavorito(videoId: string): void {
    let favoritos = this.getFavoritos();
    favoritos = favoritos.filter((video) => video.id.videoId !== videoId);
    localStorage.setItem(this.favoritosKey, JSON.stringify(favoritos)); // Use favoritosKey
    console.log('Video eliminado de favoritos:', videoId);
  }

    Favorito(video: Item): void {
    if (this.isFavorito(video.id.videoId)) {
      this.removeFavorito(video.id.videoId);
    } else {
      this.addFavorito(video);
    }

  }
}
