import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { concatLatestFrom } from '@ngrx/operators';

import { PicsumService } from '@photo-library/core';

import * as PhotosActions from './photos.actions';
import { selectIsPageLoaded } from './photos.selectors';
import { Store } from '@ngrx/store';

@Injectable()
export class PhotosEffects {
  private readonly actions$ = inject(Actions);
  private readonly api = inject(PicsumService);
  private readonly store = inject(Store);

  loadPhotos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PhotosActions.loadPhotos),
      concatLatestFrom(({ page }) => this.store.select(selectIsPageLoaded(page))),
      switchMap(([{ page, limit }, loaded]) => {
        if (loaded) {
          return of(PhotosActions.loadPhotosFromCache());
        }
        return this.api.getListOfPhotos(page, limit).pipe(
          map((photos) => PhotosActions.loadPhotosSuccess({ photos, page })),
          catchError((error) => of(PhotosActions.loadPhotosFailure({ error }))),
        );
      }),
    ),
  );
}
