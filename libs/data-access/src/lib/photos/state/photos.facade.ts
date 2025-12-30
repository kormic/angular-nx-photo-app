import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as PhotosActions from './photos.actions';
import * as PhotosSelectors from './photos.selectors';

@Injectable()
export class PhotosFacade {
  private readonly store = inject(Store);
  readonly photos$ = this.store.select(PhotosSelectors.selectAllPhotos);
  readonly loading$ = this.store.select(PhotosSelectors.selectLoading);
  readonly hasMore$ = this.store.select(PhotosSelectors.selectHasMore);

  // TODO: move limit in a config
  loadPhotos(page: number, limit = 10): void {
    this.store.dispatch(PhotosActions.loadPhotos({ page, limit }));
  }
}
