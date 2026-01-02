import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Photo, PicsumPhotoDTO, mapPicsumPhotoToPhoto } from '@photo-library/shared';
import { catchError, EMPTY, map, Observable } from 'rxjs';
import { PICSUM_ΤΟΚΕΝ, PicsumConfig } from '@photo-library/data-access';

@Injectable({ providedIn: 'root' })
export class PicsumService {
  private readonly http = inject(HttpClient);
  private readonly config = inject<PicsumConfig>(PICSUM_ΤΟΚΕΝ);

  getListOfPhotos(page: number, limit: number) {
    return this.http.get<PicsumPhotoDTO[]>(`${this.config.baseUrl}/v2/list?page=${page}&limit=${limit}`).pipe(
      map((picsumPhotos) => picsumPhotos.map(mapPicsumPhotoToPhoto)),
      catchError((error) => {
        console.error(error);

        return EMPTY;
      }),
    );
  }

  getPhotoById(id: string): Observable<Photo> {
    return this.http.get<PicsumPhotoDTO>(`${this.config.baseUrl}/id/${id}/info`).pipe(
      map(mapPicsumPhotoToPhoto),
      catchError((error) => {
        console.error(error);

        return EMPTY;
      }),
    );
  }
}
