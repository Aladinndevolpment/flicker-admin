"use client";
import TextInput from "@/app/components/controls/TextBox";
import { FormikHelpers, useFormik } from "formik";
import * as Yup from "yup";
import { login } from "../actions";
import { useRouter } from "next/navigation";

interface LoginFormValues {
  email: string;
  password: string;
}

export default function Login() {
  const router = useRouter();
  const loginFormData = {
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string().required("Password is required."),
    }),
    onSubmit: loginUser,
  };
  const registerForm = useFormik<LoginFormValues>(loginFormData);

  function loginUser(
    values: LoginFormValues,
    { setErrors, setSubmitting, setFieldError }: FormikHelpers<LoginFormValues>
  ) {
    setSubmitting(true);
    login(values)
      .then((data) => {
        if (data.status != 200) throw data;
        setSubmitting(false);

        router.replace("/user");
      })
      .catch((e) => {
        console.log(e);

        setSubmitting(false);

        if (e.status >= 400) {
          if (e.data.email) {
            setFieldError("email", e.data.email[0]);
          }
          if (e.data.first_name) {
            setFieldError("first_name", e.data.first_name[0]);
          }
          if (e.data.last_name) {
            setFieldError("last_name", e.data.last_name[0]);
          }
          if (e.data.password) {
            setFieldError("password", e.data.password[0]);
          }
          if (e.data.message) {
            setFieldError("email", e.data.message);
          }
        } else {
          setFieldError("email", e.data.message);
        }
      });
  }
  return (
    <div className="flex items-center justify-center w-full h-screen">
      <div className="w-96">
        <div className="px-4">
          <div className="mb-3 space-y-5 mt-3">
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
              disabled={registerForm.isSubmitting}
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
