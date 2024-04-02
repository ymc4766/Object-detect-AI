import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../redux/userApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { setCrediantials } from "../redux/authSlice";
import { toast } from "react-toastify";

const LoginUser = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [login, { isLoading, error }] = useLoginMutation();
  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("/");

  const navigate = useNavigate();

  const dispatch = useDispatch();

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [userInfo, navigate]);

  const submitHandler = async (e) => {
    try {
      e.preventDefault();

      const res = await login({ email, password }).unwrap();
      dispatch(setCrediantials({ ...res }));
      // const userCartData = await setCredential(res.id);
      // dispatch(setCart(userCartData));
      toast.success("login succesfuly ...");
      navigate(redirect);
      console.log("res", res);
    } catch (err) {
      console.log(err.data?.message || err.error);
      // toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto sm:px-3 md:px-0 p-2 mt-6 md:mt-12"
    >
      {/* SignIn Form goes here */}
      <form
        className="max-w-md mx-auto bg-white p-8 rounded shadow-md"
        onSubmit={submitHandler}
      >
        <h1 className="text-2xl font-bold text-gray-700 mb-4">Sign in </h1>
        {/* Email Input */}

        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            className="border-2 border-gray-300 p-2 w-full rounded"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}

            // Add your email input logic and state here
          />
        </div>

        {/* Password Input */}
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border-2 border-gray-300 p-2 w-full rounded"
            placeholder="Enter your password"
            // Add your password input logic and state here
          />
        </div>

        {/* Sign In Button */}
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700"
          // Add your sign-in logic here
        >
          Sign In
        </button>

        <div className="py-2 text-lg font-bold text-gray-600 cursor-pointer">
          <p>
            Don't have Account{" "}
            <Link className="text-blue-700" to="/register">
              Register
            </Link>
          </p>
        </div>
      </form>
      {/* Your form elements and logic go here */}
    </motion.div>
  );
};

export default LoginUser;
