import { PicsumPhotoDTO } from '../dtos/picsum-photo';

export type Photo = Pick<PicsumPhotoDTO, 'id' | 'height' | 'width'> & { url: URL };
