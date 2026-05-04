import { authMiddleware } from "@middlewares/auth.middleware";
import { Router } from "express";
import { PostController } from "./post.controller";
import { validateMiddleware } from "@middlewares/validate.middleware";
import { postCreateSchema } from "./post.scheme";
import {
	processImageMiddleware,
	uploadMiddleware,
} from "@middlewares/upload.middleware";

export const PostRouter = Router();

PostRouter.get("/", authMiddleware, PostController.getAllPosts);
PostRouter.get("/my", authMiddleware, PostController.getUserPosts);
PostRouter.get("/tags", authMiddleware, PostController.getAllTags);
PostRouter.post(
	"/",
	authMiddleware,
	uploadMiddleware.array("images"),
	validateMiddleware(postCreateSchema),
	processImageMiddleware(1000, 80, true, true),
	PostController.createPost,
);
