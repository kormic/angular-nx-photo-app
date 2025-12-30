import { Component, inject } from '@angular/core';
import { InfiniteSentinelDirective, GalleryGrid } from '@photo-library/shared';

import { GalleryVMService } from './services/gallery-vm.service';

@Component({
  selector: 'lib-gallery',
  templateUrl: './gallery.html',
  styleUrl: './gallery.scss',
  imports: [InfiniteSentinelDirective, GalleryGrid],
  providers: [GalleryVMService],
})
export class Gallery {
  public readonly galleryVM = inject(GalleryVMService);

  public loadNextPage() {
    if (this.galleryVM.state().hasMore && !this.galleryVM.state().loading) {
      this.galleryVM.loadPage();
    }
  }
}
