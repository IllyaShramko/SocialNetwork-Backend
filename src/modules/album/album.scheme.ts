import * as yup from "yup";

export const albumUpdateSchema = yup.object({
	id: yup.number().required("Id is required"),
	theme: yup.string().required("theme is required"),
	year: yup.number().required(),
	name: yup.string().required(),
});

export const albumCreateSchema = yup.object({
	theme: yup.string().required("theme is required"),
	year: yup.number().required(),
	name: yup.string().required(),
});
