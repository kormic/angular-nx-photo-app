import { PicsumPhotoDTO } from '../dtos';
import { Photo } from '../models';

export const mapPicsumPhotoToPhoto = (picsumPhoto: PicsumPhotoDTO): Photo => {
  return {
    id: picsumPhoto.id,
    author: picsumPhoto.author,
    url: new URL(picsumPhoto.download_url),
    height: picsumPhoto.height,
    width: picsumPhoto.width,
  };
};
