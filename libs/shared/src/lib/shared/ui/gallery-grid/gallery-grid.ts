import { ChangeDetectionStrategy, Component, inject, Input } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { PhotoCard } from '@photo-library/shared';
import { Photo } from '@photo-library/shared';
import { GridService } from './grid.service';

@Component({
  selector: 'lib-gallery-grid',
  template: `
    <mat-grid-list [cols]="gridColumns()" [gutterSize]="'20px'">
      @for (photo of photos; track photo.id) {
        <mat-grid-tile><lib-photo-card [photo]="photo" /></mat-grid-tile>
      }
      <ng-content />
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
  @Input() public photos: Photo[] = [];
  public readonly gridColumns = inject(GridService).gridColumns;
}
