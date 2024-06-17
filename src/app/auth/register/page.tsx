"use client";
import TextInput from "@/app/components/controls/TextBox";
import { FormikHelpers, useFormik } from "formik";
import * as Yup from "yup";
import { register } from "../actions";

interface RegisterFormValues {
  email: string;
  first_name: string;
  last_name: string;
  password: string;
  // Uncomment and add types for the other fields if needed
  // phone?: string;
  // gender?: string;
  // state?: string;
  // address?: string;
  // dob?: string;
  // preference?: string[];
  // terms?: boolean;
}

const registerFormData = {
  initialValues: {
    email: "",
    first_name: "",
    last_name: "",
    password: "",
    // phone: "",
    // gender: "M",
    // state: "",
    // address: "",
    // dob: "",
    // preference: "",
    // terms: false,
  },
  validationSchema: Yup.object({
    first_name: Yup.string()
      .max(15, "Must be 15 characters or less")
      .required("First name is required"),
    last_name: Yup.string()
      .max(20, "Must be 20 characters or less")
      .required("Last name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string().required("Password is required."),
    // state: Yup.string().required("State is required."),
    // dob: Yup.string().required("DOB is required."),
    // gender: Yup.string().required("Gender is required"),
    // preference: Yup.array().required("Preferences are required."),
    // terms: Yup.boolean().oneOf([true], "Please accept the terms of services."),
  }),
  onSubmit: registerUser,
};

async function registerUser(
  values: RegisterFormValues,
  formikHelpers: FormikHelpers<RegisterFormValues>
) {
  const data = await register(values);
  console.log(data);
}

export default function Register() {
  const registerForm = useFormik<RegisterFormValues>(registerFormData);
  return (
    <div className="flex items-center justify-center w-full h-screen">
      <div className="w-96">
        <div className="px-4">
          <div className="mb-3 space-y-5 mt-3">
            <TextInput
              label="First Name"
              placeholder="Your first name"
              id="first_name"
              formik={registerForm}
              autoCapitalize="none"
              autoComplete="name"
              type="text"
            />

            <TextInput
              label="Last Name"
              placeholder="Your Last name"
              id="last_name"
              formik={registerForm}
              autoCapitalize="none"
              autoComplete="name"
              type="text"
            />

            <TextInput
              label="Email address"
              placeholder="Your email address"
              id="email"
              formik={registerForm}
              autoCapitalize="none"
              autoComplete="email"
              type="email"
            />

            <TextInput
              label="Password"
              placeholder="Your password"
              id="password"
              formik={registerForm}
              autoCapitalize="none"
              autoComplete="password"
              type="password"
            />

            <button
              type="submit"
              onClick={() => registerForm.handleSubmit()}
              className="mt-5 rounded-md bg-primary px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
