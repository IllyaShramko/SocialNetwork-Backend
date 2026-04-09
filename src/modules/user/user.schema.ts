import * as yup from "yup";

export const regSchema = yup.object({
	email: yup
		.string()
		.required("Email field is required")
		.email("Невірний формат електронної пошти"),
	password: yup
		.string()
		.required("Password field is required")
		.min(8, "Password must contain at least 8 characters"),
});

export const loginSchema = yup.object({
	email: yup
		.string()
		.required("Email field is required")
		.email("Email must be valid"),
	password: yup
		.string()
		.required("Password field is required")
		.min(8, "Password must contain at least 8 characters"),
});
