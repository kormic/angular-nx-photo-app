export const PHOTOS_FEATURE_KEY = 'photos';

import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { Photo } from '@photo-library/shared';

import * as PhotosActions from './photos.actions';

export interface PhotosState extends EntityState<Photo> {
  loading: boolean;
  loadedPages: Set<number>;
  hasMore: boolean;
}

export const adapter = createEntityAdapter<Photo>();

export const initialState: PhotosState = adapter.getInitialState({
  loading: false,
  loadedPages: new Set(),
  hasMore: false,
});

export const photosReducer = createReducer(
  initialState,
  on(PhotosActions.loadPhotos, (state) => ({
    ...state,
    loading: true,
  })),
  on(PhotosActions.loadPhotosFromCache, (state) => ({
    ...state,
    loading: false,
  })),
  on(PhotosActions.loadPhotosSuccess, (state, { photos, page, limit }) =>
    adapter.upsertMany(photos, {
      ...state,
      loadedPages: state.loadedPages.add(page),
      loading: false,
      hasMore: photos.length >= limit,
    }),
  ),
);
