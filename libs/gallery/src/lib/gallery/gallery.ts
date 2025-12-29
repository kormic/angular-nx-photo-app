import { Component, inject } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { PhotoCard } from '@photo-library/shared';

import { GalleryVMService } from './services/gallery-vm.service';
import { GridService } from './services/grid.service';

@Component({
  selector: 'lib-gallery',
  templateUrl: './gallery.html',
  styleUrl: './gallery.scss',
  imports: [MatGridListModule, PhotoCard],
  providers: [GridService, GalleryVMService],
})
export class Gallery {
  public readonly gridColumns = inject(GridService).gridColumns;
  public readonly galleryVM = inject(GalleryVMService).state;
}
