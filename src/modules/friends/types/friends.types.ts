import { Prisma } from "../../../generated/prisma";

export type ProfileWithUser = Prisma.ProfileGetPayload<{
	include: {
		user: {
			omit: {
				password: true;
			};
		};
	};
}>;

export type ShortFriendRequest = Prisma.FriendsRequestGetPayload<{}>;

export type ShortFriendInfo = Prisma.ProfileFriendsGetPayload<{}>;

export type Profile = Prisma.ProfileGetPayload<{}>;

export type FriendRequestWithProfile = Prisma.FriendsRequestGetPayload<{
	include: {
		fromProfile: {
			include: {
				user: {
					omit: {
						password: true;
					};
				};
			};
		};
	};
}>;

export type FriendWithProfile = Prisma.ProfileFriendsGetPayload<{
	include: {
		fromProfile: {
			include: {
				user: {
					omit: {
						password: true;
					};
				};
			};
		};
		toProfile: {
			include: {
				user: {
					omit: {
						password: true;
					};
				};
			};
		};
	};
}>;
