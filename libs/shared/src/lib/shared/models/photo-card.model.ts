import { Photo } from './photo';

export type PhotoWithFavorite = Photo & { isFavorite: boolean };
