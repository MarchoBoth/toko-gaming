import React from "react";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import illustration from "images/login-illustration.svg";
import logo from "images/logo.svg";
import googleIconImageSrc from "images/google-icon.png";
import twitterIconImageSrc from "images/twitter-icon.png";
import { ReactComponent as LoginIcon } from "feather-icons/dist/icons/log-in.svg";
import { useAuth } from "context/AuthProvider";

const LoginPage = () => {
  const { login, form, setForm } = useAuth();

  const logoLinkUrl = "#";
  const illustrationImageSrc = illustration;
  const headingText = "Sign In To Toko Komputer";
  const socialButtons = [
    {
      iconImageSrc: googleIconImageSrc,
      text: "Sign In With Google",
      url: "https://google.com",
    },
    {
      iconImageSrc: twitterIconImageSrc,
      text: "Sign In With Twitter",
      url: "https://twitter.com",
    },
  ];
  const submitButtonText = "Sign In";
  const forgotPasswordUrl = "#";
  const signupUrl = "#";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Call the login function from useAuth
    await login();
  };

  return (
    <AnimationRevealPage>
      <div className="min-h-screen bg-gray-900 text-gray-200 font-medium flex justify-center -m-8">
        <div className="max-w-screen-xl m-0 sm:mx-20 sm:my-16 bg-gray-800 text-gray-200 shadow sm:rounded-lg flex justify-center flex-1">
          <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
            {/* <a href={logoLinkUrl}>
              <img src={logo} className="h-12 mx-auto" alt="Logo" />
            </a> */}
            <div className="mt-12 flex flex-col items-center">
              <h1 className="text-2xl xl:text-3xl font-extrabold">
                {headingText}
              </h1>
              <div className="w-full flex-1 mt-8">
                {/* <div className="flex flex-col items-center">
                  {socialButtons.map((socialButton, index) => (
                    <a
                      key={index}
                      className="w-full max-w-xs font-bold shadow-sm rounded-lg py-3
                      bg-blue-500 text-gray-200 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:bg-blue-700 focus:shadow-outline mt-5"
                      href={socialButton.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span className="iconContainer">
                        <img
                          src={socialButton.iconImageSrc}
                          className="icon"
                          alt=""
                        />
                      </span>
                      <span className="text">{socialButton.text}</span>
                    </a>
                  ))}
                </div> */}
                <div className="my-12 border-b border-gray-700 text-center relative">
                  <div className="leading-none px-2 inline-block text-sm text-gray-400 tracking-wide font-medium bg-gray-800 transform -translate-y-1/2 absolute inset-x-0 top-1/2">
                    Or Sign in with your e-mail
                  </div>
                </div>
                <form className="mx-auto max-w-xs" onSubmit={handleSubmit}>
                  <input
                    className="w-full px-8 py-4 rounded-lg font-medium bg-gray-900 border border-gray-700 placeholder-gray-400 text-gray-200 focus:outline-none focus:border-gray-400 focus:bg-gray-800 transition-all"
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChange}
                  />
                  <input
                    className="w-full px-8 py-4 rounded-lg font-medium bg-gray-900 border border-gray-700 placeholder-gray-400 text-gray-200 focus:outline-none focus:border-gray-400 focus:bg-gray-800 mt-5 transition-all"
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={form.password}
                    onChange={handleChange}
                  />
                  <button
                    className="mt-5 tracking-wide font-semibold bg-blue-500 text-gray-200 w-full py-4 rounded-lg   flex items-center justify-center focus:shadow-outline focus:outline-none"
                    type="submit"
                  >
                    <LoginIcon className="w-6 h-6 -ml-2" />
                    <span className="ml-3">{submitButtonText}</span>
                  </button>
                  {/* <div className="mt-6 text-xs text-gray-400 text-center">
                    <a
                      href={forgotPasswordUrl}
                      className="border-b border-gray-400 border-dotted"
                    >
                      Forgot Password ?
                    </a>
                  </div> */}
                  <p className="mt-8 text-center text-gray-400">
                    Don't have an account?{" "}
                    <a
                      href={signupUrl}
                      className="text-blue-500 hover:text-blue-700 font-bold"
                    >
                      Sign Up
                    </a>
                  </p>
                </form>
              </div>
            </div>
          </div>
          <div className="sm:rounded-r-lg flex-1 bg-purple-100 text-center hidden lg:flex justify-center">
            <div
              className={`m-12 xl:m-16 w-full max-w-sm bg-contain bg-center bg-no-repeat`}
              style={{ backgroundImage: `url("${illustrationImageSrc}")` }}
            ></div>
          </div>
        </div>
      </div>
    </AnimationRevealPage>
  );
};

export default LoginPage;
