import { Prisma } from "../../../generated/prisma";

export type Post = Prisma.PostGetPayload<{}>;

export type PostCreateDto = {
	title: string;
	topic: string;
	content: string;
	tagIds: number[];
	images: string[];
	links: string[];
};

export type PostCreate = Prisma.PostGetPayload<{
	omit: {
		id: true;
		createdAt: true;
		updatedAt: true;
	};
}>;

export type PostImage = Prisma.PostImageGetPayload<{}>;

export type PostFullInfoDTO = Prisma.PostGetPayload<{
	include: {
		tags: {
			include: {
				tag: true;
			};
		};
		links: true;
		images: true;
		author: {
			omit: {
				password: true;
			};
			include: {
				profile: {
					select: {
						pseudonym: true;
						signature: true;
						avatar: true;
						is_image_signature: true;
						is_text_signature: true;
					};
				};
			};
		};
		likes: true;
		views: true;
		hearts: true;
	};
}>;

export type PostToShow = Prisma.PostGetPayload<{
	include: {
		tags: {
			include: {
				tag: true;
			};
		};
		links: true;
		images: true;
		author: {
			omit: {
				password: true;
			};
			include: {
				profile: {
					select: {
						pseudonym: true;
						signature: true;
						avatar: true;
						is_image_signature: true;
						is_text_signature: true;
					};
				};
			};
		};
	};
}> & {
	likes: number;
	hearts: number;
	views: number;
	isLiked: boolean;
	isHearted: boolean;
	isViewed: boolean;
};

export type TagPost = Prisma.TagPostGetPayload<{
	include: {
		tag: true;
	};
}>;

export type PostLink = Prisma.PostLinkGetPayload<{}>;

export type Tag = Prisma.TagGetPayload<{}>;
