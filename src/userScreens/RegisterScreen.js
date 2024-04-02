import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { setCrediantials } from "../redux/authSlice";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useRegisterMutation } from "../redux/userApiSlice";
import { toast } from "react-toastify";

const RegisterScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");
  const [confirmPAssword, setConfirmPassword] = useState("");

  const [register, { isLoading, error }] = useRegisterMutation();
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
    e.preventDefault();
    try {
      if (password !== confirmPAssword) {
        toast.error("password must match");
        return;
      } else {
        const res = await register({ name, email, password }).unwrap();
        dispatch(setCrediantials({ ...res }));
        navigate("/");
      }
    } catch (err) {
      toast.error(err?.data?.message || err?.error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto mt-10"
    >
      {/* SignIn Form goes here */}
      <form
        className="max-w-md mx-auto bg-white p-8 rounded shadow-md"
        onSubmit={submitHandler}
      >
        <h1 className="text-2xl font-bold text-gray-700 mb-4">Sign Up</h1>
        {/* Email Input */}
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border-2 border-gray-300 p-2 w-full rounded"
            placeholder="Enter your Name"
            // Add your email input logic and state here
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id="email"
            className="border-2 border-gray-300 p-2 w-full rounded"
            placeholder="Enter your email"
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
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Password
          </label>
          <input
            type="password"
            id="confirm"
            value={confirmPAssword}
            onChange={(e) => setConfirmPassword(e.target.value)}
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
          Sign up
        </button>
      </form>
      {/* Your form elements and logic go here */}
    </motion.div>
  );
};

export default RegisterScreen;
