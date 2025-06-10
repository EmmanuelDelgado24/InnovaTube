import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {ListadoResponse} from '../../app/shared/interfaces/lista.interfaces';

@Injectable({
  providedIn: 'root',
})
export class YoutubeService {
  private backendUrl = 'http://localhost:3000/api/youtube';
  
  constructor(private http: HttpClient) {}

  // Buscar videos
  searchVideos(query: string, maxResults: number = 40): Observable<ListadoResponse> {
    let params = new HttpParams()
      .set('q', query)
      .set('maxResults', maxResults.toString());

    return this.http.get<ListadoResponse>(`${this.backendUrl}/videos`, { params });
  }
}
