import { Autocomplete, InputLabel, Snackbar, TextField } from "@mui/material";
import Head from "next/head";
import Link from "next/link";
import React, { useState } from "react";
import { countries } from "assets/static";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Loading } from "assets/icons";
import { useAppContext } from "context";

const Register = () => {
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const { refetchUser } = useAppContext();

  //   console.log("hello");
  const formik = useFormik({
    initialValues: {
      name: "",
      userName: "",
      email: "",
      country: "",
      phone: "",
      password: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Required").min(3, "Too Short!"),
      userName: Yup.string().required("Required").min(3, "Too Short!"),
      email: Yup.string().required("Required"),
      country: Yup.string().required("Required"),
      phone: Yup.string().matches(/^[0-9]{10}$/, "Invalid phone number"),
      password: Yup.string()
        .required("Required")
        .min(6, "Password must be at least 6 characters"),
    }),
    onSubmit: async (values, submitProps) => {
      try {
        setLoading(true);
        const data = values;
        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        };
        const response = await fetch("/api/user/register", options);

        let json = await response.json();

        if (response.status === 200) {
          setAlertMessage("Register Successful");
          setAlert(true);
          formik.resetForm();
          refetchUser();
        }
        setLoading(false);
      } catch (error: any) {
        setLoading(false);
        setAlertMessage(error?.message);
        setAlert(true);
      }
    },
  });

  return (
    <>
      <Head>
        <title>Register</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="dark login-ui">
        <Snackbar
          open={alert}
          autoHideDuration={5000}
          onClose={() => {
            setAlert(false);
          }}
          message={alertMessage}
        />
        <section className=" w-full backdrop-brightness-50 py-12 flex items-center justify-center min-h-screen ">
          <div className="w-[400px] rounded-md flex flex-col bg-gray-100 border border-gray-400 dark:bg-gray-700 dark:border-gray-400 ">
            <h3 className="text-base py-4 w-full text-center text-gray-400 uppercase dark:text-gray-400 tracking-wider font-medium">
              Welcome to movie hub
            </h3>
            <h3 className="text-xl  w-full text-center text-gray-800  dark:text-gray-200 tracking-wider font-medium">
              Create your account
            </h3>
            <form className="p-4" onSubmit={formik.handleSubmit}>
              <div className="pb-4 gap-2 text-white flex flex-col ">
                <InputLabel className="text-white text-sm font-medium tracking-wider ">
                  {" "}
                  Name{" "}
                </InputLabel>

                <TextField
                  fullWidth
                  placeholder="Enter your name"
                  name="name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.name && formik.errors.name ? true : false
                  }
                  helperText={formik.touched.name && formik.errors.name}
                />
              </div>
              <div className="pb-4 gap-2 text-white flex flex-col ">
                <InputLabel className="text-white text-sm font-medium tracking-wider ">
                  {" "}
                  User Name{" "}
                </InputLabel>

                <TextField
                  fullWidth
                  placeholder="Enter your username"
                  name="userName"
                  value={formik.values.userName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.userName && formik.errors.userName
                      ? true
                      : false
                  }
                  helperText={formik.touched.userName && formik.errors.userName}
                />
              </div>
              <div className="pb-4 gap-2 text-white flex flex-col ">
                <InputLabel className="text-white text-sm font-medium tracking-wider ">
                  {" "}
                  Email{" "}
                </InputLabel>

                <TextField
                  fullWidth
                  placeholder="Enter your email"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.email && formik.errors.email ? true : false
                  }
                  helperText={formik.touched.email && formik.errors.email}
                />
              </div>
              <div className="pb-4 gap-2 text-white flex flex-col ">
                <InputLabel
                  className="text-white text-sm font-medium tracking-wider "
                  id="select-country-label"
                >
                  {" "}
                  Country{" "}
                </InputLabel>

                <Autocomplete
                  fullWidth
                  options={countries}
                  autoHighlight
                  getOptionLabel={(option) => option.label}
                  onChange={(event, value) => {
                    formik.setFieldValue("country", value?.phone);
                  }}
                  renderOption={(props, option) => (
                    <li
                      {...props}
                      className="flex gap-2 items-center p-2 hover:bg-gray-300 cursor-pointer"
                    >
                      <img
                        loading="lazy"
                        width="20"
                        src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                        srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                        alt=""
                      />
                      {option.label} ({option.code}) +{option.phone}
                    </li>
                  )}
                  renderInput={(params) => (
                    <>
                      <TextField
                        {...params}
                        fullWidth
                        placeholder="Select your country"
                        inputProps={{
                          ...params.inputProps,
                          autoComplete: "new-password", // disable autocomplete and autofill
                        }}
                        name="country"
                        value={formik.values.country}
                        error={
                          formik.touched.country && formik.errors.country
                            ? true
                            : false
                        }
                        helperText={
                          formik.touched.country && formik.errors.country
                        }
                      />
                    </>
                  )}
                />
              </div>
              <div className="pb-4 gap-2 text-white flex flex-col ">
                <InputLabel className="text-white text-sm font-medium tracking-wider ">
                  {" "}
                  Phone{" "}
                </InputLabel>

                <TextField
                  fullWidth
                  placeholder="Enter your Phone"
                  name="phone"
                  type={"number"}
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.phone && formik.errors.phone ? true : false
                  }
                  helperText={formik.touched.phone && formik.errors.phone}
                />
              </div>

              <div className="pb-8 gap-2 text-white flex flex-col ">
                <span className="flex justify-between items-center">
                  <InputLabel className="text-white text-sm font-medium tracking-wider ">
                    {" "}
                    Password{" "}
                  </InputLabel>
                </span>

                <TextField
                  fullWidth
                  placeholder="Enter your password"
                  name="password"
                  value={formik.values.password}
                  type="password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.password && formik.errors.password
                      ? true
                      : false
                  }
                  helperText={formik.touched.password && formik.errors.password}
                />
              </div>

              <button
                type="submit"
                className="w-full hover:bg-teal-600 ease-in-out duration-300 flex items-center justify-center transition-all bg-teal-500 rounded-sm text-white text-base tracking-wide  h-[2.5rem] "
              >
                {loading ? (
                  <span className="flex items-center gap-8">
                    <Loading className="animate-spin text-2xl " />
                    Loading...
                  </span>
                ) : (
                  "Register"
                )}
              </button>
              <span className="text-sm py-4 w-full flex items-center text-center text-gray-400 gap-2 dark:text-gray-400 tracking-wider font-medium">
                <h3>Already having an account?</h3>
                <h3>
                  <Link href={"/login"}>
                    <a className="text-base text-white">Login</a>
                  </Link>
                </h3>
              </span>
            </form>
          </div>
        </section>
      </main>
    </>
  );
};

export default Register;
