import { Component, inject } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { PhotoCard } from '@photo-library/shared';
import { GridService } from './services/grid.service';

@Component({
  selector: 'lib-gallery',
  templateUrl: './gallery.html',
  styleUrl: './gallery.scss',
  imports: [MatGridListModule, PhotoCard],
  providers: [GridService],
})
export class Gallery {
  public readonly gridColumns = inject(GridService).gridColumns;

  dummyPhotos = [
    { text: 'One', cols: 1, rows: 1, color: 'lightblue' },
    { text: 'Two', cols: 1, rows: 1, color: 'lightgreen' },
    { text: 'Three', cols: 1, rows: 1, color: 'lightpink' },
  ];
}
