import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'lib-box',
  styles: `
    .box {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 50px;
      border: 1px solid lightblue;
      border-radius: 8px;
      background: var(--mat-sys-primary);
      color: white;
      margin-top: 30px;
      font-size: larger;
    }
  `,
  template: `
    <mat-divider></mat-divider>
    <div class="box"><ng-content /></div>
  `,

  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatDividerModule],
})
export class BoxComponent {}
