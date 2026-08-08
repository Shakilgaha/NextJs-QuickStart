import * as Yup from "yup";

export const loginSchema = Yup.object({
  email: Yup.string().email("Invalid email address").required("Email is required"),
  password: Yup.string().min(6, "Password must be at least 6 characters long").required("Password is required"),
});

export const registerSchema = Yup.object({
  name: Yup.string().min(2, "Name must be at least 2 characters long").required("Name is required"),
  email: Yup.string().email("Invalid email address").required("Email is required"),
  password: Yup.string().min(6, "Password must be at least 6 characters long").required("Password is required"),
  confirmPassword: Yup.string()
    .min(6, "Confirm password must be at least 6 characters long")
    .required("Confirm password is required")
    .oneOf([Yup.ref("password")], "Passwords do not match"),
});

export const forgotPasswordSchema = Yup.object({
  email: Yup.string().email("Invalid email address").required("Email is required"),
});

export const resetPasswordSchema = Yup.object({
  token: Yup.string().required("Token is required"),
  password: Yup.string().min(6, "Password must be at least 6 characters long").required("Password is required"),
  confirmPassword: Yup.string()
    .min(6, "Confirm password must be at least 6 characters long")
    .required("Confirm password is required")
    .oneOf([Yup.ref("password")], "Passwords do not match"),
});
