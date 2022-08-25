import { InputLabel, Snackbar, TextField } from "@mui/material";
import { Loading } from "assets/icons";
import { useAppContext } from "context";
import { useFormik } from "formik";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import Swal from "sweetalert2";
import * as Yup from "yup";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const { refetchUser } = useAppContext();

  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .required("Email is required")
        .email("Email is not valid"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: async (values) => {
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
        const response = await fetch("/api/user/login", options);

        let json = await response.json();

        if (response.status === 200) {
          Swal.fire({
            title: "Success",
            text: json.message,
            icon: "success",
          });
          formik.resetForm();
          refetchUser();
          router?.push("/profile");
          return;
        }
        Swal.fire({
          title: "Error",
          text: json.message,
          icon: "error",
        });
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
        <title>Login</title>
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
        <section className=" w-full backdrop-brightness-50 flex items-center justify-center min-h-screen ">
          <div className="w-[400px] rounded-md flex flex-col bg-gray-100 border border-gray-400 dark:bg-gray-700 dark:border-gray-400 ">
            <h3 className="text-base py-4 w-full text-center text-gray-400 uppercase dark:text-gray-400 tracking-wider font-medium">
              Welcome back
            </h3>
            <h3 className="text-xl  w-full text-center text-gray-800  dark:text-gray-200 tracking-wider font-medium">
              Login to your account
            </h3>
            <div className="p-4">
              <div className="pb-4 gap-2 text-white flex flex-col ">
                <InputLabel className="text-white text-sm font-medium tracking-wider ">
                  {" "}
                  Email{" "}
                </InputLabel>

                <TextField
                  fullWidth
                  placeholder="Enter your email"
                  name="email"
                  onChange={formik?.handleChange}
                  value={formik?.values?.email}
                  onBlur={formik.handleBlur}
                  error={Boolean(
                    formik?.touched?.email && formik?.errors?.email
                  )}
                  helperText={formik?.touched?.email && formik?.errors?.email}
                />
              </div>
              <div className="pb-8 gap-2 text-white flex flex-col ">
                <span className="flex justify-between items-center">
                  <InputLabel className="text-white text-sm font-medium tracking-wider ">
                    {" "}
                    Password{" "}
                  </InputLabel>
                  <span className="text-white text-sm font-medium tracking-wider ">
                    Forgot Password?
                  </span>
                </span>

                <TextField
                  fullWidth
                  placeholder="Enter your password"
                  name="password"
                  onChange={formik?.handleChange}
                  value={formik?.values?.password}
                  onBlur={formik.handleBlur}
                  error={Boolean(
                    formik?.touched?.password && formik?.errors?.password
                  )}
                  helperText={
                    formik?.touched?.password && formik?.errors?.password
                  }
                />
              </div>

              <button
                type="submit"
                className="w-full hover:bg-teal-600 ease-in-out   duration-300 transition-all bg-teal-500 rounded-sm text-white text-base tracking-wide  h-[2.5rem] "
                onClick={() => formik.handleSubmit()}
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-8">
                    <Loading className="animate-spin text-2xl " />
                    Loading...
                  </span>
                ) : (
                  "Register"
                )}
              </button>
              <span className="text-sm py-4 w-full flex items-center text-center text-gray-400 gap-2 dark:text-gray-400 tracking-wider font-medium">
                <h3>Don{"'"}t have an account?</h3>
                <h3>
                  <Link href={"/register"}>
                    <a className="text-base text-white">Register</a>
                  </Link>
                </h3>
              </span>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Login;
