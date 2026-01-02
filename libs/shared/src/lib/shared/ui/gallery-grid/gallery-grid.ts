import { ChangeDetectionStrategy, Component, inject, input, output } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { Photo, PhotoCard, PhotoWithFavorite } from '@photo-library/shared';

import { GridService } from './grid.service';

@Component({
  selector: 'lib-gallery-grid',
  template: `
    <mat-grid-list [cols]="gridColumns()" [gutterSize]="'20px'">
      @for (photo of photos(); track photo.id) {
        <mat-grid-tile
          ><lib-photo-card
            [photo]="photo"
            [showActions]="canToggleFavorites()"
            [isFavorite]="photo.isFavorite"
            (toggleFavoriteEvent)="toggleFavorite($event)"
        /></mat-grid-tile>
      }
      <mat-grid-tile-footer>
        <ng-content />
      </mat-grid-tile-footer>
    </mat-grid-list>
  `,
  styles: `
    :host {
      // Set this to prevent the grid from material to align the items at the center
      // so we can control the spacing between the grid and the header
      ::ng-deep .mat-grid-tile-content {
        align-items: flex-start;
      }
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatGridListModule, PhotoCard],
  providers: [GridService],
})
export class GalleryGrid {
  public readonly photos = input.required<PhotoWithFavorite[]>();
  public readonly canToggleFavorites = input.required<boolean>();
  public readonly toggleFavoriteEvent = output<Photo>();
  public readonly gridColumns = inject(GridService).gridColumns;

  toggleFavorite(photo: Photo) {
    this.toggleFavoriteEvent.emit(photo);
  }
}
