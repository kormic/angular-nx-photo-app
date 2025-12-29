import { Injectable, signal, WritableSignal } from '@angular/core';

import { GalleryViewModel } from '../gallery.view-model';

@Injectable()
export class GalleryVMService {
  private readonly _state: WritableSignal<GalleryViewModel> = signal(
    { photos: [], page: 1, limit: 10, loading: false, hasMore: false },
    {},
  );
  public readonly state = this._state.asReadonly();
}
