import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { PICSUM_ΤΟΚΕΝ, PicsumConfig } from '../../config';
import * as PhotosActions from './photos.actions';
import * as PhotosSelectors from './photos.selectors';

@Injectable()
export class PhotosFacade {
  private readonly config = inject<PicsumConfig>(PICSUM_ΤΟΚΕΝ);
  private readonly store = inject(Store);
  readonly photos$ = this.store.select(PhotosSelectors.selectAllPhotos);
  readonly loading$ = this.store.select(PhotosSelectors.selectLoading);
  readonly hasMore$ = this.store.select(PhotosSelectors.selectHasMore);

  loadPhotos(page: number, limit = this.config.pageLimit): void {
    this.store.dispatch(PhotosActions.loadPhotos({ page, limit }));
  }
}
