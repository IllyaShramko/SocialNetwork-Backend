import { ForbiddenError } from "@errors/app.errors";
import { AlbumRepository } from "./album.repository";
import { AlbumService as AlbumServiceContract } from "./types/album.contracts";
import { UserRepository } from "../user/user.repository";

export const AlbumService: AlbumServiceContract = {
	async createAlbum(userId, data) {
		const profile = await UserRepository.findProfileByUserId(userId);
		data.isShown = true
		data.isDefault = true
		const album = await AlbumRepository.createAlbum({
			...data,
			profileId: profile.id,
		});
		return album;
	},
	async updateAlbum(userId, data, id) {
		const profile = await UserRepository.findProfileByUserId(userId);
		const album = await AlbumRepository.findById(id);
		if (album.profileId !== profile.id) {
			throw new ForbiddenError("album with id " + id);
		}
		const updatedAlbum = await AlbumRepository.updateAlbum(id, data);
		return updatedAlbum;
	},
	async deleteAlbum(userId, id) {
		const profile = await UserRepository.findProfileByUserId(userId);
		const album = await AlbumRepository.findById(id);
		if (album.profileId !== profile.id) {
			throw new ForbiddenError("album with id " + id);
		}
		const deletedAlbum = await AlbumRepository.deleteAlbum(id);
		return deletedAlbum;
	},
	async getMyAlbums(userId) {
		const profile = await UserRepository.findProfileByUserId(userId);
		const albums = await AlbumRepository.getAlbumsByProfileId(profile.id);
		return albums;
	},
	async uploadImages(albumId, userId, filenames) {
		const profile = await UserRepository.findProfileByUserId(userId);
		const album = await AlbumRepository.findById(albumId);
		if (album.profileId !== profile.id) {
			throw new ForbiddenError("album with id " + albumId);
		}
		const uploadPromises = filenames.map((filename) => {
			return AlbumRepository.uploadImage({
				image: filename,
				isShown: true,
				albumId,
			});
		});

		return await Promise.all(uploadPromises);
	},
	async changeImageVisibility(id, userId) {
		const image = await AlbumRepository.findImageById(id);
		if (image.album.profile.userId !== userId) {
			throw new ForbiddenError("image with id " + image.id);
		}
		const changedImage = await AlbumRepository.changeImageVisibility(
			id,
			!image.isShown,
		);
		return changedImage;
	},
	async deleteImage(id, userId) {
		const image = await AlbumRepository.findImageById(id);
		if (image.album.profile.userId !== userId) {
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
