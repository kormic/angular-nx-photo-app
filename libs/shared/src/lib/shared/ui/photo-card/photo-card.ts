import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'lib-photo-card',
  styles: `
    .example-card {
      img {
        width: 100%;
      }
    }
  `,
  template: `
    <mat-card class="example-card" appearance="outlined">
      <img
        mat-card-image
        src="https://material.angular.dev/assets/img/examples/shiba2.jpg"
        alt="Photo of a Shiba Inu" />
      <mat-card-actions>
        <button matButton>LIKE</button>
      </mat-card-actions>
    </mat-card>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatCardModule, MatButtonModule],
})
export class PhotoCard {}
