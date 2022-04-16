import { InputLabel, TextField } from "@mui/material";
import Head from "next/head";
import Link from "next/link";
import React from "react";

const login = () => {
  return (
    <>
      <Head>
        <title>Login</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="dark login-ui">
        <section className="bg-white w-full dark:bg-gray-900 flex items-center justify-center min-h-screen ">
          <div className="w-[400px] rounded-md flex flex-col bg-gray-100 border border-gray-400 dark:bg-gray-700 dark:border-gray-400 ">
            <h3 className="text-base py-4 w-full text-center text-gray-400 uppercase dark:text-gray-400 tracking-wider font-medium">
              Welcome back
            </h3>
            <h3 className="text-xl  w-full text-center text-gray-800  dark:text-gray-200 tracking-wider font-medium">
              Login to your account
            </h3>
            <form className="p-4">
              <div className="pb-4 gap-2 text-white flex flex-col ">
                <InputLabel className="text-white text-sm font-medium tracking-wider ">
                  {" "}
                  Email{" "}
                </InputLabel>

                <TextField fullWidth placeholder="Enter your email" />
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

                <TextField fullWidth placeholder="Enter your password" />
              </div>

              <button
                type="submit"
                className="w-full hover:bg-teal-600 ease-in-out duration-300 transition-all bg-teal-500 rounded-sm text-white text-base tracking-wide  h-[2.5rem] "
              >
                Login
              </button>
              <span className="text-sm py-4 w-full flex items-center text-center text-gray-400 gap-2 dark:text-gray-400 tracking-wider font-medium">
                <h3>Don't have an account?</h3>
                <h3>
                  <Link href={"/register"}>
                    <a className="text-base text-white">Register</a>
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

export default login;
