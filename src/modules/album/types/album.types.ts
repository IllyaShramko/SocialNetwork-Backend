import { Prisma } from "../../../generated/prisma";

export type Album = Prisma.AlbumGetPayload<{
	include: {
		images: true;
		profile: { select: { userId: true } };
	};
}>;

export type ImagePayload = Prisma.AlbumImageGetPayload<{}>;

export type CreateAlbum = Prisma.AlbumUncheckedCreateInput;

export type UpdateAlbum = Prisma.AlbumUncheckedUpdateInput;

export type CreateImageCheckedPayload = Prisma.AlbumImageUncheckedCreateInput;

export interface UploadImagesCredentials {
	images: string[];
}

export type ImageWithAlbumAndProfileWithUserId = Prisma.AlbumImageGetPayload<{
	include: { album: { select: { profile: { select: { userId: true } } } } };
}>;
