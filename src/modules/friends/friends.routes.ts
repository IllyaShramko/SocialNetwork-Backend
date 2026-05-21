import { authMiddleware } from "@middlewares/auth.middleware";
import { paginationMiddleware } from "@middlewares/pagination.middleware";
import { Router } from "express";
import { FriendsController } from "./friends.controller";

export const FriendsRouter = Router();

FriendsRouter.post(
	"/req/:profileId",
	authMiddleware,
	FriendsController.acceptRequest,
);
FriendsRouter.delete(
	"/req/:profileId",
	authMiddleware,
	FriendsController.declineRequest,
);
FriendsRouter.get(
	"/req",
	authMiddleware,
	paginationMiddleware,
	FriendsController.getRequests,
);

FriendsRouter.post(
	"/all/:profileId",
	authMiddleware,
	FriendsController.sendRequest,
);
FriendsRouter.get(
	"/all",
	authMiddleware,
	paginationMiddleware,
	FriendsController.getRecs,
);

FriendsRouter.delete(
	"/my/:profileId",
	authMiddleware,
	FriendsController.deleteFriend,
);
FriendsRouter.get(
	"/my",
	authMiddleware,
	paginationMiddleware,
	FriendsController.getFriends,
);
