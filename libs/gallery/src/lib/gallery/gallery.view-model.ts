import { Photo } from '@photo-library/shared';

export interface GalleryViewModel {
  photos: Photo[];
  page: number;
  limit: number;
  loading: boolean;
  hasMore: boolean;
}
