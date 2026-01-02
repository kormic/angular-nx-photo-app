import { from, of } from 'rxjs';
import { catchError, concatMap, map, switchMap } from 'rxjs/operators';

import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { concatLatestFrom } from '@ngrx/operators';

import { PicsumService } from '@photo-library/core';

import * as PhotosActions from './photos.actions';
import { selectMissingPages } from './photos.selectors';
import { Store } from '@ngrx/store';

@Injectable()
export class PhotosEffects {
  private readonly actions$ = inject(Actions);
  private readonly api = inject(PicsumService);
  private readonly store = inject(Store);

  loadPhotos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PhotosActions.loadPhotos),
      concatLatestFrom(({ page }) => this.store.select(selectMissingPages(page))),
      switchMap(([{ limit }, missingPages]) => {
        if (missingPages.length === 0) {
          return of(PhotosActions.loadPhotosFromCache());
        }

        return from(missingPages).pipe(
          concatMap((missingPage) =>
            this.api
              .getListOfPhotos(missingPage, limit)
              .pipe(map((photos) => PhotosActions.loadPhotosSuccess({ photos, page: missingPage, limit }))),
          ),
          catchError((error) => of(PhotosActions.loadPhotosFailure({ error }))),
        );
      }),
    ),
  );
}
