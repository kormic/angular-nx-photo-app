import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PicsumPhotoDTO, mapPicsumPhotoToPhoto } from '@photo-library/shared';
import { catchError, EMPTY, map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PicsumService {
  private readonly http = inject(HttpClient);

  getListOfPhotos(page: number, limit: number) {
    // TODO: get the url from a config
    return this.http.get<PicsumPhotoDTO[]>(`https://picsum.photos/v2/list?page=${page}&limit=${limit}`).pipe(
      map((picsumPhotos) => picsumPhotos.map(mapPicsumPhotoToPhoto)),
      catchError((error) => {
        console.error(error);

        return EMPTY;
      }),
    );
  }
}
