import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Photo } from '../../models';

@Component({
  selector: 'lib-photo-card',
  styles: `
    .photo-card-container {
      img {
        width: 100%;
      }
    }
  `,
  template: `
    <mat-card class="photo-card-container" appearance="outlined">
      <img
        mat-card-image
        [src]="'https://picsum.photos/id/' + photo()?.id + '/500/400'"
        [alt]="'Photo by ' + photo()?.author" />
      <mat-card-actions>
        <button matButton>LIKE</button>
      </mat-card-actions>
    </mat-card>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatCardModule, MatButtonModule],
})
export class PhotoCard {
  //  TODO: get the url used in the template from a config
  public photo = input<Photo>();
}
