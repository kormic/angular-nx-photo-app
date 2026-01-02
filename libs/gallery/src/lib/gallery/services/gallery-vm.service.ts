import { computed, effect, inject, Injectable, signal, untracked } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { PhotosFacade, PICSUM_ΤΟΚΕΝ, PicsumConfig, STORAGE_TOKEN } from '@photo-library/data-access';
import { Photo, PhotoWithFavorite } from '@photo-library/shared';

import { GalleryViewModel } from '../gallery.view-model';

@Injectable()
export class GalleryVMService {
  private readonly config = inject<PicsumConfig>(PICSUM_ΤΟΚΕΝ);
  private readonly facade = inject(PhotosFacade);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly storage = inject(STORAGE_TOKEN);

  private readonly queryParams = toSignal(this.route.queryParamMap, {
    initialValue: this.route.snapshot.queryParamMap,
  });
  private readonly photos = toSignal(this.facade.photos$, { initialValue: [] });
  private readonly loading = toSignal(this.facade.loading$, { initialValue: false });
  private readonly hasMore = toSignal(this.facade.hasMore$, { initialValue: false });
  private readonly page = computed(() => Number(this.queryParams().get('page') ?? 1));
  private readonly limit = computed(() => Number(this.queryParams().get('limit') ?? this.config.pageLimit));
  private readonly storedFavorites = signal<Map<string, PhotoWithFavorite>>(
    new Map(this.storage.loadFromStorage<[string, PhotoWithFavorite][]>('STORED_FAVORITES', [])),
  );

  public readonly state = computed<GalleryViewModel>(() => {
    const photos = this.photos().map((photo) => ({ ...photo, isFavorite: this.storedFavorites().has(photo.id) }));
    const page = this.page();
    const limit = this.limit();

    return {
      photos: photos,
      page,
      limit,
      loading: this.loading(),
      hasMore: this.hasMore(),
    };
  });

  constructor() {
    effect(() => {
      const page = this.page();
      const limit = this.limit();
      untracked(() => this.facade.loadPhotos(page, limit));
    });
  }

  loadPage() {
    const nextPage = this.page() + 1;

    this.router.navigate([], {
      queryParams: { page: nextPage },
      queryParamsHandling: 'merge',
      replaceUrl: true,
    });
  }

  toggleIsFavorite(photo: Photo) {
    const favorites = new Map(this.storage.loadFromStorage<[string, PhotoWithFavorite][]>('STORED_FAVORITES', []));
    const favoriteIsInStorage = favorites.has(photo.id);

    if (!favoriteIsInStorage) {
      favorites.set(photo.id, { ...photo, isFavorite: true });
    }

    if (favoriteIsInStorage) {
      favorites.delete(photo.id);
    }

    this.storedFavorites.set(favorites);
    this.storage.saveToStorage('STORED_FAVORITES', [...this.storedFavorites().entries()]);
  }
}
