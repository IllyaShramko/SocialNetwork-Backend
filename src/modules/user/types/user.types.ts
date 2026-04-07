import { type Prisma } from "../../../generated/prisma";
import { type InferType } from "yup";	
import { loginSchema, regSchema } from "../user.schema";

export type User = Prisma.UserGetPayload<{
	omit: {
		password: true;
	};
}>;
export type VerificationCode = Prisma.VerificationCodeGetPayload<{}>

export type CreateUserPayload = Prisma.UserUncheckedCreateInput;

export type UserWithPassword = Prisma.UserGetPayload<{}>;

export type LoginCredentials = InferType<typeof loginSchema>;

export type RegisterCredentials = InferType<typeof regSchema>;

export type MeDTO = {
	userId: number;
};
export type TokenDTO = {
	token: string;
};