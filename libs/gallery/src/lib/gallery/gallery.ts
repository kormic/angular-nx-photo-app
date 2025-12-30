import { Component, inject } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { InfiniteSentinelDirective, PhotoCard } from '@photo-library/shared';

import { GalleryVMService } from './services/gallery-vm.service';
import { GridService } from './services/grid.service';

@Component({
  selector: 'lib-gallery',
  templateUrl: './gallery.html',
  styleUrl: './gallery.scss',
  imports: [MatGridListModule, PhotoCard, InfiniteSentinelDirective],
  providers: [GridService, GalleryVMService],
})
export class Gallery {
  public readonly gridColumns = inject(GridService).gridColumns;
  public readonly galleryVM = inject(GalleryVMService);

  public loadNextPage() {
    if (this.galleryVM.state().hasMore && !this.galleryVM.state().loading) {
      this.galleryVM.loadPage();
    }
  }
}
