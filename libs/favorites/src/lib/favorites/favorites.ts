import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { GalleryGrid } from '@photo-library/shared';

import { FavoritesVMService } from './services/favorites-vm.service';

@Component({
  selector: 'lib-favorites',
  templateUrl: './favorites.html',
  styleUrl: './favorites.scss',
  imports: [GalleryGrid, RouterLink],
  providers: [FavoritesVMService],
})
export class Favorites {
  public readonly favoritesVM = inject(FavoritesVMService);
}
