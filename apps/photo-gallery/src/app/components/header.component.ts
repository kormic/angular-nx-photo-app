import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-header',
  styles: `
    nav {
      display: flex;
      gap: 5px;
      align-items: center;
    }

    a.active {
      background: var(--mat-sys-primary);
      color: var(--mat-sys-accent);
    }
  `,
  template: `
    <nav aria-label="Primary navigation">
      <a matFab extended routerLink="gallery" routerLinkActive="active" queryParamsHandling="merge">
        <mat-icon color="accent">home</mat-icon>
        Gallery
      </a>
      <a matFab extended routerLink="favorites" routerLinkActive="active" queryParamsHandling="merge">
        <mat-icon color="accent">favorite</mat-icon>
        Favorites
      </a>
    </nav>
  `,
  imports: [RouterLink, RouterLinkActive, MatIconModule, MatButtonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {}
