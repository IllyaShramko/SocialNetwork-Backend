import * as yup from "yup";

export const postCreateSchema = yup.object({
	title: yup
		.string()
		.min(3, "Title is too short")
		.max(255, "Title is too long")
		.required("Title is required"),

	topic: yup
		.string()
		.min(2, "Topic must be informative")
		.required("Topic is required"),

	description: yup
		.string()
		.min(4, "Description must be more detailed")
		.required("Description is required"),

	tagIds: yup.array().of(yup.number().integer().min(0)).ensure(),

	links: yup.array().of(yup.string().url("Invalid link format")).ensure(),
});
