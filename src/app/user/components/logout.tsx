"use client";
import { logout } from "@/app/auth/actions";
import { useFormik } from "formik";

export default function Logout() {
  const logoutFormData = {
    initialValues: {},

    onSubmit: logoutUser,
  };

  function logoutUser() {
    logout();
  }

  const logoutForm = useFormik(logoutFormData);
  return <button onClick={() => logoutForm.submitForm()}>Logout</button>;
}
