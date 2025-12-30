import { PicsumPhotoDTO } from '../dtos/picsum-photo';

export type Photo = Pick<PicsumPhotoDTO, 'id' | 'author' | 'height' | 'width'> & { url: URL };
