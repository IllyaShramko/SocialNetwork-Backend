import { BadRequestError } from "@errors/app.errors";
import { AlbumService } from "./album.service";
import { AlbumController as AlbumControllerContract } from "./types/album.contracts";

export const AlbumController: AlbumControllerContract = {
	async createAlbum(req, res, next) {
		const createdAlbum = await AlbumService.createAlbum(
			res.locals.userId,
			req.body,
		);
		res.status(201).json(createdAlbum);
	},
	async updateAlbum(req, res, next) {
		const albumId = req.params.id;
		if (!albumId) {
			throw new BadRequestError("albumId is required");
		}
		if (isNaN(+albumId)) {
			throw new BadRequestError("albumId must be integer");
		}
		const updatedAlbum = await AlbumService.updateAlbum(
			res.locals.userId,
			req.body,
			+albumId,
		);
		res.status(200).json(updatedAlbum);
	},
	async deleteAlbum(req, res, next) {
		const albumId = req.params.id;
		if (!albumId) {
			throw new BadRequestError("albumId is required");
		}
		if (isNaN(+albumId)) {
			throw new BadRequestError("albumId must be integer");
		}
		const deletedAlbum = await AlbumService.deleteAlbum(
			res.locals.userId,
			+albumId,
		);
		res.status(200).json(deletedAlbum);
	},
	async getTags(req, res, next) {
		const tags = await AlbumService.getTags();
		res.status(200).json(tags);
	},
	async getMyAlbums(req, res, next) {
		const albums = await AlbumService.getMyAlbums(res.locals.userId);
		res.status(200).json(albums);
	},
	async uploadImages(req, res, next) {
		const albumId = req.params.id;
		if (!albumId) {
			throw new BadRequestError("albumId is required");
		}
		if (isNaN(+albumId)) {
			throw new BadRequestError("albumId must be integer");
		}
		if (!req.files || req.files.length === 0) {
			throw new BadRequestError("files is required");
		}

		const filenames: string[] = (req.files as Express.Multer.File[]).map(
			(file) => file.filename,
		);
		console.log(req.files);

		const images = await AlbumService.uploadImages(
			+albumId,
			res.locals.userId,
			filenames,
		);
		res.status(200).json(images);
	},
	async changeImageVisibility(req, res, next) {
		const imageId = req.params.imageId;
		if (!imageId) {
			throw new BadRequestError("imageId is required");
		}
		if (isNaN(+imageId)) {
			throw new BadRequestError("imageId must be integer");
		}
		const albumId = req.params.albumId;
		if (!albumId) {
			throw new BadRequestError("albumId is required");
		}
		if (isNaN(+albumId)) {
			throw new BadRequestError("albumId must be integer");
		}
		const image = await AlbumService.changeImageVisibility(
			+imageId,
			res.locals.userId,
		);
		res.status(200).json(image);
	},
	async deleteImage(req, res, next) {
		const imageId = req.params.imageId;
		if (!imageId) {
			throw new BadRequestError("imageId is required");
		}
		if (isNaN(+imageId)) {
			throw new BadRequestError("imageId must be integer");
		}
		const albumId = req.params.albumId;
		if (!albumId) {
			throw new BadRequestError("albumId is required");
		}
		if (isNaN(+albumId)) {
			throw new BadRequestError("albumId must be integer");
		}
		const image = await AlbumService.deleteImage(
			+imageId,
			res.locals.userId,
		);
		res.status(200).json(image);
	},
	// async update(req, res, next) {
	// 	const updatedAlbum = await AlbumService.update(
	// 		req.body,
	// 	);
	//     res.status(201).json(updatedAlbum)
	// },
};
