import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'gallery' },
  {
    path: 'gallery',
    loadChildren: () => import('@photo-library/gallery').then((m) => m.GALLERY_ROUTES),
  },
  {
    path: 'favorites',
    loadChildren: () => import('@photo-library/favorites').then((m) => m.FAVORITES_ROUTES),
  },
];
