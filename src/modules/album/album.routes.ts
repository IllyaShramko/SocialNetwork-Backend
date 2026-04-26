import { validateMiddleware } from "@middlewares/validate.middleware";
import { Router } from "express";
import { albumCreateSchema } from "./album.scheme";
import { AlbumController } from "./album.controller";
import { authMiddleware } from "@middlewares/auth.middleware";
import {
	processImageMiddleware,
	uploadMiddleware,
} from "@middlewares/upload.middleware";

export const AlbumRouter = Router();

AlbumRouter.get("/my", authMiddleware, AlbumController.getMyAlbums);
AlbumRouter.post(
	"/",
	authMiddleware,
	validateMiddleware(albumCreateSchema),
	AlbumController.createAlbum,
);
AlbumRouter.put("/:id", authMiddleware, AlbumController.updateAlbum);
AlbumRouter.delete("/:id", authMiddleware, AlbumController.deleteAlbum);

AlbumRouter.get("/tags", AlbumController.getTags);

AlbumRouter.post(
	"/:id/images",
	authMiddleware,
	uploadMiddleware.array("images"),
	processImageMiddleware(600, 80, false, true),
	AlbumController.uploadImages,
);
AlbumRouter.patch(
	"/:albumId/images/:imageId",
	authMiddleware,
	AlbumController.changeImageVisibility,
);
AlbumRouter.delete(
	"/:albumId/images/:imageId",
	authMiddleware,
	AlbumController.deleteImage,
);
