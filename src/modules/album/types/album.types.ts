import { Prisma } from "../../../generated/prisma";

export type Album = Prisma.AlbumGetPayload<{
	include: { images: true; topic: true };
}>;

export type ImagePayload = Prisma.ImageGetPayload<{}>;

export type CreateAlbum = Prisma.AlbumUncheckedCreateInput;

export type UpdateAlbum = Prisma.AlbumUncheckedUpdateInput;

export type CreateImageCheckedPayload = Prisma.ImageCreateInput;

export type Tag = Prisma.TagGetPayload<{}>;

export interface UploadImagesCredentials {
	images: string[];
}

export type Image = Prisma.ImageGetPayload<{}>;

export type ImageWithAlbum = Prisma.ImageGetPayload<{
	include: { album: true };
}>;

export type ImageCreate = Prisma.ImageUncheckedCreateInput;
