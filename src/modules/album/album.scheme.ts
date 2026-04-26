import * as yup from "yup";

export const albumUpdateSchema = yup.object({
	id: yup.number().required("Id is required"),
	topicId: yup.number().required("topicId is required"),
	year: yup.number().required(),
	name: yup.string().required(),
});

export const albumCreateSchema = yup.object({
	topicId: yup.number().required("topicId is required"),
	year: yup.number().required(),
	name: yup.string().required(),
});
