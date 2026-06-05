import { Router } from "express";
import {
	UserRouter,
	AlbumRouter,
	PostRouter,
	FriendsRouter,
	ChatsRouter,
} from "../modules";

export const router = Router();

router.get("/health", (req, res) => {
	res.json({ status: "OK", timestamp: Date.now().toLocaleString() });
});

router.use("/users/", UserRouter);

router.use("/album/", AlbumRouter);

router.use("/posts/", PostRouter);

router.use("/friends/", FriendsRouter);

router.use("/chats/", ChatsRouter);
