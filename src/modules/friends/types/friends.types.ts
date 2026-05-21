import { Prisma } from "../../../generated/prisma";

export type UserWithProfile = Prisma.UserGetPayload<{
	include: {
		profile: true;
	};
	omit: {
		password: true;
	};
}>;

export type ShortFriendInfo = Prisma.FriendShipGetPayload<{}>;

export type Profile = Prisma.ProfileGetPayload<{}>;

export type FriendRequestWithProfile = Prisma.FriendShipGetPayload<{
	include: {
		fromUser: {
			omit: {
				password: true;
			};
			include: {
				profile: true;
			};
		};
	};
}>;

export type FriendWithProfile = Prisma.FriendShipGetPayload<{
	include: {
		fromUser: {
			omit: {
				password: true;
			};
			include: {
				profile: true;
			};
		};
		toUser: {
			omit: {
				password: true;
			};
			include: {
				profile: true;
			};
		};
	};
}>;
