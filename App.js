import React from "react";
import './App.css'
import { useFormik } from "formik";
import * as Yup from "yup";

export default function App() {
  const formik = useFormik({
    initialValues: {
      full_name: "",
      email: "",
      password: "",
      confirm_password: ""
    },
    validationSchema: Yup.object({
      full_name: Yup
        .string()
        .min(2, "Minimum 2 characters")
        .max(15, "Maximum 15 characters")
        .required("Name Field Required!"),
      email: Yup 
        .string()
        .email("Invalid email format")
        .required("Email Field Required!"),
      password: Yup
        .string()
        .min(8, "Minimum 8 characters")
        .matches(/^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
        "Password must contain at least 8 characters, one uppercase, one number and one special case character"
       )
       .required("Password Field Required!"),
      confirm_password: Yup
        .string()
        .oneOf([Yup.ref("password")], "Password's not match")
        .required("Password Field Required!")
    }),
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
    }
  });


  return (
    <div className="App">

      <form className="form" onSubmit={formik.handleSubmit}>
        <div>
          <label className='label'>Full Name:</label>
          <input
            type="text"
            name="full_name"
            //its not the best solution to use trim after there
            value={formik.values.full_name.trim()}
            onChange={formik.handleChange}
          />
          {formik.errors.full_name && formik.touched.full_name && (
            <p>{formik.errors.full_name}</p>
          )}
        </div>
        <div>
          <label className='label'>Email:</label>
          <input
            type="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
          />
          {formik.errors.email && formik.touched.email && (
            <p>{formik.errors.email}</p>
          )}
        </div>
        <div>
          <label className='label'>Password:</label>
          <input
            type="password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
          />
          {formik.errors.password && formik.touched.password && (
            <p>{formik.errors.password}</p>
          )}
        </div>
        <div>
          <label className='label'>Confirm Password:</label>
          <input
            type="password"
            name="confirm_password"
            value={formik.values.confirm_password}
            onChange={formik.handleChange}
          />
          {formik.errors.confirm_password && formik.touched.confirm_password && (
            <p>{formik.errors.confirm_password}</p>
          )}
        </div>
        <div>
          <br></br>
          <button className="btn" type="submit">Submit</button>
        </div>
      </form>
    </div>

  );
}