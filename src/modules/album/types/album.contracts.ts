import { NextFunction, Request, Response } from "express";
import {
	Album,
	CreateAlbum,
	Image,
	ImageCreate,
	ImageWithAlbum,
	Tag,
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
	getTags: () => Promise<Tag[]>;
	getMyAlbums: (userId: number) => Promise<Album[]>;
	uploadImages: (albumId: number, userId: number, filenames: string[]) => Promise<Image[]>;
	changeImageVisibility: (id: number, userId: number) => Promise<Image>;
	deleteImage: (id: number, userId: number) => Promise<Image>;
}

export interface AlbumRepository {
	findById: (id: number) => Promise<Album>;
	createAlbum: (data: CreateAlbum) => Promise<Album>;
	updateAlbum: (id: number, data: UpdateAlbum) => Promise<Album>;
	deleteAlbum: (id: number) => Promise<Album>;
	getTags: () => Promise<Tag[]>;
	getAlbumsByUserId: (userId: number) => Promise<Album[]>;
	uploadImage: (data: ImageCreate) => Promise<Image>;
	findImageById: (id: number) => Promise<ImageWithAlbum>;
	changeImageVisibility: (id: number, visibility: boolean) => Promise<Image>;
	deleteImage: (id: number) => Promise<Image>;
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
	getTags: (
		req: Request<object, Tag[]>,
		res: Response<Tag[]>,
		next: NextFunction,
	) => void;
	uploadImages: (
		req: Request<
			{ id: string },
			Image[],
			UploadImagesCredentials,
			object,
			AuthenticatedUser
		>,
		res: Response<Image[], AuthenticatedUser>,
		next: NextFunction,
	) => void;

	changeImageVisibility: (
		req: Request<
			{ albumId: string; imageId: string },
			Image,
			object,
			object,
			AuthenticatedUser
		>,
		res: Response<Image, AuthenticatedUser>,
		next: NextFunction,
	) => void;

	deleteImage: (
		req: Request<
			{ albumId: string; imageId: string },
			Image,
			object,
			object,
			AuthenticatedUser
		>,
		res: Response<Image, AuthenticatedUser>,
		next: NextFunction,
	) => void;

	// update: (
	// 	req: Request<object, Album, UpdateAlbum, object, AuthenticatedUser>,
	// 	res: Response<Album, AuthenticatedUser>,
	// 	next: NextFunction,
	// ) => void;
}
