import { ChangeDetectionStrategy, Component, inject, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Photo } from '../../models';

import { PICSUM_ΤΟΚΕΝ, PicsumConfig } from '@photo-library/data-access';

@Component({
  selector: 'lib-photo-card',
  styles: `
    .photo-card-container {
      img {
        width: 100%;
      }

      .liked {
        background-color: blue;
        color: white;
      }
    }
  `,
  template: `
    <mat-card class="photo-card-container" appearance="outlined">
      <img
        mat-card-image
        [src]="config.baseUrl + '/id/' + photo().id + '/500/400'"
        [alt]="'Photo by ' + photo().author" />
      @if (showActions()) {
        <mat-card-actions>
          <button [class.liked]="isFavorite()" matButton (click)="toggleFavorite(photo())">LIKE</button>
        </mat-card-actions>
      }
    </mat-card>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatCardModule, MatButtonModule],
})
export class PhotoCard {
  public readonly config = inject<PicsumConfig>(PICSUM_ΤΟΚΕΝ);
  public photo = input.required<Photo>();
  public showActions = input.required<boolean>();
  public isFavorite = input.required<boolean>();
  public readonly toggleFavoriteEvent = output<Photo>();

  toggleFavorite(photo: Photo) {
    this.toggleFavoriteEvent.emit(photo);
  }
}
