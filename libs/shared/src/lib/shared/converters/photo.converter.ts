import { PicsumPhotoDTO } from '../dtos';
import { Photo } from '../models';

export const mapPicsumPhotoToPhoto = (picsumPhoto: PicsumPhotoDTO): Photo => {
  return {
    id: picsumPhoto.id,
    url: new URL(picsumPhoto.url),
    height: picsumPhoto.height,
    width: picsumPhoto.width,
  };
};
