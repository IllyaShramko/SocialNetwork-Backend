import { authMiddleware } from "@middlewares/auth.middleware";
import { Router } from "express";
import { FriendsController } from "./friends.controller";

export const FriendsRouter = Router();

FriendsRouter.post(
	"/req/:userId",
	authMiddleware,
	FriendsController.acceptRequest,
);
FriendsRouter.delete(
	"/req/:userId",
	authMiddleware,
	FriendsController.declineRequest,
);
FriendsRouter.get("/req", authMiddleware, FriendsController.getRequests);

FriendsRouter.post(
	"/all/:userId",
	authMiddleware,
	FriendsController.sendRequest,
);
FriendsRouter.get("/all", authMiddleware, FriendsController.getRecs);

FriendsRouter.delete(
	"/my/:userId",
	authMiddleware,
	FriendsController.deleteFriend,
);
FriendsRouter.get("/my", authMiddleware, FriendsController.getFriends);
