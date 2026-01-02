// photos.selectors.ts
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { adapter, PhotosState, PHOTOS_FEATURE_KEY } from './photos.reducer';

export const selectPhotosState = createFeatureSelector<PhotosState>(PHOTOS_FEATURE_KEY);

const { selectAll } = adapter.getSelectors();

export const selectAllPhotos = createSelector(selectPhotosState, selectAll);

export const selectLoading = createSelector(selectPhotosState, (state) => state.loading);
export const selectHasMore = createSelector(selectPhotosState, (state) => state.hasMore);

export const selectMissingPages = (lastPage: number) =>
  createSelector(selectPhotosState, (state) => {
    // On first load we have nothing in cache
    // so we fetch all of them
    if (state.loadedPages.size === 0) {
      return [...Array(lastPage).keys()];
    }

    // When a new page is coming we need to load only that page
    if (lastPage - state.loadedPages.size === 1) {
      return [lastPage];
    }

    // We have everything in cache so we don't need to fetch anything
    return [];
  });
