import * as yup from "yup";

export const chatCreateSchema = yup.object({
	name: yup.string().trim().optional(),
	userIds: yup
		.array()
		.of(yup.number().integer().positive().required())
		.min(1)
		.required(),
});