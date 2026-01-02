import { PhotoWithFavorite } from '@photo-library/shared';

export interface GalleryViewModel {
  photos: PhotoWithFavorite[];
  page: number;
  limit: number;
  loading: boolean;
  hasMore: boolean;
}
