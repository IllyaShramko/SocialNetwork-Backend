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

export const updateUserSchema = yup.object({
	email: yup.string().email("Email must be valid"),
	firstName: yup.string().nullable(),
	name: yup.string().nullable(),
	surname: yup.string().nullable(),
	birthday: yup.date().nullable(),
	username: yup.string().nullable(),
});
export const updatePasswordSchema = yup.object({
	newPassword: yup
		.string()
		.required("New password field is required")
		.min(8, "New password must contain at least 8 characters"),
});
