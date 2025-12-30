import { createAction, props } from '@ngrx/store';
import { Photo } from '@photo-library/shared';

export const loadPhotos = createAction('[Photos] Load Photos', props<{ page: number; limit: number }>());
export const loadPhotosFromCache = createAction('[Photos] Load Photos from cache');
export const loadPhotosSuccess = createAction(
  '[Photos] Load Photos Success',
  props<{ photos: Photo[]; page: number }>(),
);
export const loadPhotosFailure = createAction('[Photos] Load Photos Failure', props<{ error: unknown }>());
