// photos.selectors.ts
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { adapter, PhotosState, PHOTOS_FEATURE_KEY } from './photos.reducer';

export const selectPhotosState = createFeatureSelector<PhotosState>(PHOTOS_FEATURE_KEY);

const { selectAll } = adapter.getSelectors();

export const selectAllPhotos = createSelector(selectPhotosState, selectAll);

export const selectLoading = createSelector(selectPhotosState, (state) => state.loading);
export const selectHasMore = createSelector(selectPhotosState, (state) => state.hasMore);

export const selectIsPageLoaded = (page: number) =>
  createSelector(selectPhotosState, (state) => state.loadedPages.has(page));
