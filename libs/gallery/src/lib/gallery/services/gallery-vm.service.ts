import { computed, effect, inject, Injectable, untracked } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { PhotosFacade } from '@photo-library/data-access';

import { GalleryViewModel } from '../gallery.view-model';

@Injectable()
export class GalleryVMService {
  private readonly facade = inject(PhotosFacade);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  private readonly queryParams = toSignal(this.route.queryParamMap, {
    initialValue: this.route.snapshot.queryParamMap,
  });
  private readonly photos = toSignal(this.facade.photos$, { initialValue: [] });
  private readonly loading = toSignal(this.facade.loading$, { initialValue: false });
  private readonly hasMore = toSignal(this.facade.hasMore$, { initialValue: false });
  private readonly page = computed(() => Number(this.queryParams().get('page') ?? 1));
  private readonly limit = computed(() => Number(this.queryParams().get('limit') ?? 10)); // TODO: move limit in a config

  public readonly state = computed<GalleryViewModel>(() => {
    const photos = this.photos();
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
}
