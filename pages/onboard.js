import { useMutation } from "@apollo/client";
import Link from "next/link";
import LogoWithText from "public/icons/logoWithText";
import React, { useContext, useState } from "react";
import { DEFAULT_LOGO_HEIGHT, DEFAULT_LOGO_WIDTH } from "utils/constant";
import { Context } from "utils/context/main";
import { CREATE_USER, LOGIN_USER } from "utils/helpers/gql/mutation";
import {
  handleChange,
  loginUser,
  registerUser,
} from "utils/helpers/miniFunctions";

const Onboard = () => {
  const [login, setLogin] = useState({ email: "", password: "" });
  const [signup, setSignup] = useState({
    username: "",
    name: "",
    email: "",
    password: "",
  });
  const [createHandler] = useMutation(CREATE_USER);
  const [loginHandlerMutation] = useMutation(LOGIN_USER);
  const [loginLoading, setLoginLoading] = useState(false);
  const [signupLoading, setSignupLoading] = useState(false);
  const { setToast } = useContext(Context);

  const loginHandler = async () => {
    try {
      await loginUser(login, loginHandlerMutation, setLoginLoading, setToast);
    } catch (error) {
      // alert(error.message);
      setToast({
        msg: error.message,
        status: true,
        type: "error",
      });
    }
  };

  const signupHandler = async () => {
    try {
      await registerUser(signup, createHandler, setSignupLoading, setToast);
    } catch (error) {
      // alert(error.message);
      setToast({
        msg: error.message,
        status: true,
        type: "error",
      });
    }
  };

  const testlogin = () => {
    setLogin({ email: "ujenbasi@gmail.com", password: "ujenbasi9818123191" });
  };

  const testSignup = () => {
    setSignup({
      email: `ujenbasi${Math.floor(
        Math.random() * (9999 - 1000) + 1000
      )}@gmail.com`,
      password: "9818123191",
    });
  };

  return (
    <>
      <header className="p-4 flex items-center justify-center border-b bg-white">
        <Link href={"/"}>
          <span className="cursor-pointer">
            <LogoWithText w={DEFAULT_LOGO_WIDTH} h={DEFAULT_LOGO_HEIGHT} />
          </span>
        </Link>
      </header>

      <main className="flex items-center justify-center h-[calc(100vh-60px)] bg-white">
        <div className="flex flex-wrap gap-spacing w-[50rem]">
          <div className="w-full lg:w-[calc(100%/2-32px)] max-w-[30rem] mx-auto border rounded-md px-6 py-4 shadow">
            <header className="flex itmes-center justify-between mb-6">
              <h1 className="text-xl text-black font-semibold">Login</h1>
              <button onClick={testlogin} className="btn-primary rounded-md">
                1
              </button>
            </header>
            <input
              type="email"
              name="email"
              value={login.email}
              placeholder="Email"
              autoComplete={"off"}
              onChange={(e) => handleChange(e, login, setLogin)}
              className="px-4 py-2 mb-4 rounded-md border w-full outline-blue_light text-black outline-[1px]"
            />
            <input
              type="password"
              name="password"
              value={login.password}
              placeholder="Password"
              autoComplete={"off"}
              onChange={(e) => handleChange(e, login, setLogin)}
              className="px-4 py-2 mb-4 rounded-md border w-full outline-blue_light text-black outline-[1px]"
            />
            <button
              onClick={loginHandler}
              className="btn-primary w-full rounded-md"
            >
              {loginLoading ? "Loading..." : "Login"}
            </button>
          </div>
          <div className="hidden lg:block my-auto">OR</div>
          <div className="w-full lg:w-[calc(100%/2-32px)] max-w-[30rem] mx-auto border rounded-md px-6 py-4 shadow">
            <header className="flex itmes-center justify-between mb-6">
              <h1 className="text-xl text-black font-semibold">Sign up</h1>
              <button onClick={testSignup} className="btn-primary rounded-md">
                1
              </button>
            </header>
            <input
              type="text"
              name="username"
              value={signup.username}
              placeholder="Username"
              autoComplete={"off"}
              onChange={(e) => handleChange(e, signup, setSignup)}
              className="px-4 py-2 mb-4 rounded-md border w-full outline-blue_light text-black outline-[1px]"
            />
            <input
              type="text"
              name="name"
              value={signup.name}
              placeholder="Name"
              autoComplete={"off"}
              onChange={(e) => handleChange(e, signup, setSignup)}
              className="px-4 py-2 mb-4 rounded-md border w-full outline-blue_light text-black outline-[1px]"
            />
            <input
              type="email"
              name="email"
              value={signup.email}
              placeholder="Email"
              autoComplete={"off"}
              onChange={(e) => handleChange(e, signup, setSignup)}
              className="px-4 py-2 mb-4 rounded-md border w-full outline-blue_light text-black outline-[1px]"
            />
            <input
              type="password"
              name="password"
              value={signup.password}
              placeholder="Password"
              autoComplete={"off"}
              onChange={(e) => handleChange(e, signup, setSignup)}
              className="px-4 py-2 mb-4 rounded-md border w-full outline-blue_light text-black outline-[1px]"
            />
            <button
              onClick={signupHandler}
              className="btn-primary w-full rounded-md"
            >
              {signupLoading ? "Loading..." : "Sign up"}
            </button>
          </div>
        </div>
      </main>
    </>
  );
};

export default Onboard;
