import { NextFunction, Request, Response } from "express";
import {
	Album,
	CreateAlbum,
	CreateImageCheckedPayload,
	ImagePayload,
	ImageWithAlbumAndProfileWithUserId,
	UpdateAlbum,
	UploadImagesCredentials,
} from "./album.types";
import { AuthenticatedUser } from "@app-types/token";

export interface AlbumService {
	createAlbum: (userId: number, data: CreateAlbum) => Promise<Album>;
	updateAlbum: (
		userId: number,
		data: UpdateAlbum,
		id: number,
	) => Promise<Album>;
	deleteAlbum: (userId: number, id: number) => Promise<Album>;
	getMyAlbums: (userId: number) => Promise<Album[]>;
	uploadImages: (
		albumId: number,
		userId: number,
		filenames: string[],
	) => Promise<ImagePayload[]>;
	changeImageVisibility: (
		id: number,
		userId: number,
	) => Promise<ImagePayload>;
	deleteImage: (id: number, userId: number) => Promise<ImagePayload>;
}

export interface AlbumRepository {
	findById: (id: number) => Promise<Album>;
	createAlbum: (data: CreateAlbum) => Promise<Album>;
	updateAlbum: (id: number, data: UpdateAlbum) => Promise<Album>;
	deleteAlbum: (id: number) => Promise<Album>;
	getAlbumsByProfileId: (profileId: number) => Promise<Album[]>;
	uploadImage: (data: CreateImageCheckedPayload) => Promise<ImagePayload>;
	findImageById: (id: number) => Promise<ImageWithAlbumAndProfileWithUserId>;
	changeImageVisibility: (
		id: number,
		visibility: boolean,
	) => Promise<ImagePayload>;
	deleteImage: (id: number) => Promise<ImagePayload>;
}

export interface AlbumController {
	createAlbum: (
		req: Request<object, Album, CreateAlbum, object, AuthenticatedUser>,
		res: Response<Album, AuthenticatedUser>,
		next: NextFunction,
	) => void;
	updateAlbum: (
		req: Request<
			{ id: string },
			Album,
			UpdateAlbum,
			object,
			AuthenticatedUser
		>,
		res: Response<Album, AuthenticatedUser>,
		next: NextFunction,
	) => void;
	deleteAlbum: (
		req: Request<{ id: string }, Album, object, object, AuthenticatedUser>,
		res: Response<Album, AuthenticatedUser>,
		next: NextFunction,
	) => void;
	getMyAlbums: (
		req: Request<object, Album[], object, object, AuthenticatedUser>,
		res: Response<Album[], AuthenticatedUser>,
		next: NextFunction,
	) => void;
	uploadImages: (
		req: Request<
			{ id: string },
			ImagePayload[],
			UploadImagesCredentials,
			object,
			AuthenticatedUser
		>,
		res: Response<ImagePayload[], AuthenticatedUser>,
		next: NextFunction,
	) => void;

	changeImageVisibility: (
		req: Request<
			{ albumId: string; imageId: string },
			ImagePayload,
			object,
			object,
			AuthenticatedUser
		>,
		res: Response<ImagePayload, AuthenticatedUser>,
		next: NextFunction,
	) => void;

	deleteImage: (
		req: Request<
			{ albumId: string; imageId: string },
			ImagePayload,
			object,
			object,
			AuthenticatedUser
		>,
		res: Response<ImagePayload, AuthenticatedUser>,
		next: NextFunction,
	) => void;

	// update: (
	// 	req: Request<object, Album, UpdateAlbum, object, AuthenticatedUser>,
	// 	res: Response<Album, AuthenticatedUser>,
	// 	next: NextFunction,
	// ) => void;
}
