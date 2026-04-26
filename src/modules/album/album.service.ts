import { ForbiddenError } from "@errors/app.errors";
import { AlbumRepository } from "./album.repository";
import { AlbumService as AlbumServiceContract } from "./types/album.contracts";

export const AlbumService: AlbumServiceContract = {
	async createAlbum(userId, data) {
		const album = await AlbumRepository.createAlbum({ ...data, userId });
		return album;
	},
	async updateAlbum(userId, data, id) {
		const album = await AlbumRepository.findById(id);
		if (album.userId !== userId) {
			throw new ForbiddenError("album with id " + id);
		}
		const updatedAlbum = await AlbumRepository.updateAlbum(id, data);
		return updatedAlbum;
	},
	async deleteAlbum(userId, id) {
		const album = await AlbumRepository.findById(id);
		if (album.userId !== userId) {
			throw new ForbiddenError("album with id " + id);
		}
		const deletedAlbum = await AlbumRepository.deleteAlbum(id);
		return deletedAlbum;
	},
	async getTags() {
		const tags = await AlbumRepository.getTags();
		return tags;
	},
	async getMyAlbums(userId) {
		const albums = await AlbumRepository.getAlbumsByUserId(userId);
		return albums;
	},
	async uploadImages(albumId, userId, filenames) {
		const uploadPromises = filenames.map((filename) => {
			return AlbumRepository.uploadImage({
				filename,
				isVisible: true,
				albumId,
				userId,
			});
		});

		return await Promise.all(uploadPromises);
	},
	async changeImageVisibility(id, userId) {
		const image = await AlbumRepository.findImageById(id);
		if (image.userId !== userId) {
			throw new ForbiddenError("image with id " + image.id);
		}
		const changedImage = await AlbumRepository.changeImageVisibility(
			id,
			!image.isVisible,
		);
		return changedImage;
	},
	async deleteImage(id, userId) {
		const image = await AlbumRepository.findImageById(id);
		if (image.userId !== userId) {
			throw new ForbiddenError("image with id " + image.id);
		}
		const deletedImage = await AlbumRepository.deleteImage(id);
		return deletedImage;
	},
	// async update(data) {
	//     const album = await AlbumRepository.update(data.id, data)
	//     return album
	// },
	// async delete(id) {
	//     return await AlbumRepository.delete(id)
	// },
};
