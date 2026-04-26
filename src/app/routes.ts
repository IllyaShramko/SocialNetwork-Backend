import { Router } from "express";
import { UserRouter, AlbumRouter } from "../modules";

export const router = Router();

router.get("/health", (req, res) => {
	res.json({ status: "OK", timestamp: Date.now().toLocaleString() });
});

router.use("/users/", UserRouter);

router.use("/album/", AlbumRouter)
