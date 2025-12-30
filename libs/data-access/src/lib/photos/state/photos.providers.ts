import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { PHOTOS_FEATURE_KEY, photosReducer } from './photos.reducer';
import { PhotosEffects } from './photos.effects';
import { PhotosFacade } from './photos.facade';

export function providePhotosState(): EnvironmentProviders {
  return makeEnvironmentProviders([
    provideState(PHOTOS_FEATURE_KEY, photosReducer),
    provideEffects(PhotosEffects),
    PhotosFacade,
  ]);
}
