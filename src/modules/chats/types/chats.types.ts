import { Prisma } from "../../../generated/prisma";

export type ChatUserWithProfile = Prisma.ChatUserGetPayload<{
	include: {
		user: {
			omit: {
				password: true;
			};
			include: {
				profile: true;
			};
		};
	};
}>;

export type ChatMessage = Prisma.MessageGetPayload<{
	include: {
		sender: {
			omit: {
				password: true;
			};
			include: {
				profile: true;
			};
		};
		messageImages: true;
		messageReaders: true;
	};
}>;

export type ChatWithPreview = Prisma.ChatGetPayload<{
	include: {
		users: {
			include: {
				user: {
					omit: {
						password: true;
					};
					include: {
						profile: true;
					};
				};
			};
		};
		messages: {
			include: {
				sender: {
					omit: {
						password: true;
					};
					include: {
						profile: true;
					};
				};
				messageImages: true;
				messageReaders: true;
			};
		};
	};
}> & {
	unreadCount: number;
};

export type ChatDirectPreviewDTO = Prisma.ChatGetPayload<{
	include: {
		messages: {
			include: {
				sender: {
					omit: {
						password: true;
					};
					include: {
						profile: true;
					};
				};
				messageImages: true;
				messageReaders: true;
			};
		};
	};
}> & {
	unreadCount: number;
	participant: ChatUserWithProfile;
};

export type ChatGroupWithPreview = Prisma.ChatGetPayload<{
	include: {
		messages: {
			include: {
				sender: {
					omit: {
						password: true;
					};
					include: {
						profile: true;
					};
				};
				messageImages: true;
				messageReaders: true;
			};
		};
	};
}> & {
	unreadCount?: number;
};

export type ChatWithUsers = Prisma.ChatGetPayload<{
	include: {
		users: {
			include: {
				user: {
					omit: {
						password: true;
					};
					include: {
						profile: true;
					};
				};
			};
		};
	};
}>;

export type ChatCreateDto = {
	name?: string;
	avatar?: string | undefined;
	userIds: number[];
};

export type ChatCreateData = {
	name: string | null;
	isGroup: boolean;
	avatar: string;
	adminId: number | null;
	userIds: number[];
};
export type ChatCreated = ChatWithUsers;

export type Chat = Prisma.ChatGetPayload<{}>;

export type CreateChat = Prisma.ChatUncheckedCreateInput;

export type ChatUserSearchResult = Prisma.UserGetPayload<{
	omit: {
		password: true;
	};
	include: {
		profile: true;
	};
}>;
