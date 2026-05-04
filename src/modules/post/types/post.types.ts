import { Prisma } from "../../../generated/prisma";

export type Post = Prisma.PostGetPayload<{}>;

export type PostCreateDto = {	
	title: string;
	topic: string;
	description: string;
	tagIds?: number[];
	images?: string[]; 
	links?: string[];
};

export type PostCreate = Prisma.PostGetPayload<{
	omit: {
		id: true,
		views: true,
		createdAt: true,
	}
}>

export type PostImage = Prisma.ImageGetPayload<{}>;

export type PostToShow = Prisma.PostGetPayload<{
	include: {
		tagPosts: {
			include: {
				tag: true;
			};
		};
		links: true;
		images: true;
		author: {
			omit: {
				password: true
			}
		}
	};
}>;

export type TagPost = Prisma.TagPostGetPayload<{
	include: {
		tag: true;
	};
}>;
export type PostLink = Prisma.LinkGetPayload<{}>;

export type Tag = Prisma.TagGetPayload<{}>;
