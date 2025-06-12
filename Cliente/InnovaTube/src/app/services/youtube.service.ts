import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ListadoResponse } from '../../app/shared/interfaces/lista.interfaces';

@Injectable({
  providedIn: 'root',
})
export class YoutubeService {
  private backendUrl = 'http://localhost:3000/api/youtube';

  constructor(private http: HttpClient) {}

  // Buscar videos
  searchVideos(
    query: string,
    maxResults: number = 40
  ): Observable<ListadoResponse> {
    let params = new HttpParams()
      .set('q', query)
      .set('maxResults', maxResults.toString());

    return this.http.get<ListadoResponse>(`${this.backendUrl}/videos`, {
      params,
    });
  }

  getVideosDetalles(videoID: string[]): Observable<ListadoResponse> {
    if(videoID.length===0) {
      return new Observable<ListadoResponse>(observer => {
        const emptyResponse: ListadoResponse = {
          kind: '', // O un valor predeterminado si tienes uno
          etag: '',
          nextPageToken: '', // Puede ser undefined si no hay página siguiente, pero la interfaz lo marca como string
          regionCode: '',
          pageInfo: {
            totalResults: 0,
            resultsPerPage: 0,
          },
          items: [],
        };
        observer.next(emptyResponse);
        observer.complete();
      });
    }

    // INSTRUCCIÓN RETURN PARA CUANDO EL ARRAY DE ID NO ESTÁ VACÍO
    let params = new HttpParams().set('ids', videoID.join(','));

    // endpoint /details para obtener detalles por IDs
    return this.http.get<ListadoResponse>(`${this.backendUrl}/details`, { params });
  }
}
