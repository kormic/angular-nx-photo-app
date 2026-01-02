import { computed, inject, Injectable, signal } from '@angular/core';
import { STORAGE_TOKEN } from '@photo-library/data-access';
import { PhotoWithFavorite } from '@photo-library/shared';

import { FavoritesViewModel } from '../favorites.view-model';

@Injectable({ providedIn: 'root' })
export class FavoritesVMService {
  private readonly storage = inject(STORAGE_TOKEN);
  private readonly storedFavorites = signal<Map<string, PhotoWithFavorite>>(
    new Map(this.storage.loadFromStorage<[string, PhotoWithFavorite][]>('STORED_FAVORITES', [])),
  );

  public readonly state = computed<FavoritesViewModel>(() => {
    const favorites = Array.from(this.storedFavorites().values());

    return {
      favorites,
    };
  });
}
