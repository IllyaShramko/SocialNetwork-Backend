import { type Prisma } from "../../../generated/prisma";
import { type InferType } from "yup";
import { loginSchema, regSchema } from "../user.schema";

export type User = Prisma.UserGetPayload<{
	include: {
		profile: true;
	};
	omit: {
		password: true;
	};
}>;

export type ProfileWithAlbumsAndPostsAndUser = Prisma.ProfileGetPayload<{
	include: {
		user: {
			omit: {
				password: true;
			};
		};
		albums: {
			include: {
				images: true;
			};
		};
	};
}>;

export type Profile = Prisma.ProfileGetPayload<{}>;
// export type VerificationCode = Prisma.VerificationCodeGetPayload<{}>;

export interface CreateUserDTO {
	email: string;
	password: string;
}

export type UserWithPassword = Prisma.UserGetPayload<{}>;

export type LoginCredentials = InferType<typeof loginSchema>;

export type RegisterCredentials = InferType<typeof regSchema>;

export type UserUpdateDTO = {
	username?: string;
	firstName?: string;
	lastName?: string;
	email?: string;
};

export type ProfileUpdateDTO = {
	birthDate?: Date;
	avatar?: string;
	pseudonym?: string;
	signature?: string;
};

export type ProfileUpdate = Pick<
	Prisma.ProfileUpdateInput,
	"pseudonym" | "avatar" | "birthDate"
>;
export type UserUpdate = Omit<
	Prisma.UserUpdateInput,
	"pseudonym" | "avatar" | "birthDate"
>;

export type UserAndProfileUpdateDTO = UserUpdateDTO & ProfileUpdateDTO;

export interface UpdatePasswordDTO {
	newPassword: string;
}

export type MeDTO = {
	userId: number;
};
export type TokenDTO = {
	token: string;
};

export type VerificationResult = "SUCCESS" | "NOT_CORRECT" | "EXPIRED";

export type CodeType = "PASSWORD_RESET" | "EMAIL_VERIFICATION";

export type FriendRequest = Prisma.FriendsRequestGetPayload<{
	include: {
		toProfile: true;
	};
}>;

export type Friend = Prisma.ProfileFriendsGetPayload<{
	include: {
		toProfile: true;
		fromProfile: true;
	};
}>;

// export type ProfileWithPosts

// export type VerificationCodeCreate = Prisma.VerificationCodeCreateInput;
