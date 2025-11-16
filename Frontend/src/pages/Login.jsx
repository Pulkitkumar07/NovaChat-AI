import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const res = await axios.post(
        "http://localhost:3000/api/auth/login",
        {
          email: data.email,
          password: data.password,
        },
        { withCredentials: true }
      );

      console.log("Login success", res.data);

      
       if (res.data?.user) {
        localStorage.setItem("user", JSON.stringify(res.data.user));
         navigate("/");
      }

     

    } catch (err) {
      console.error("Error", err);
      alert(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0F0F10] text-white">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-96 p-6 bg-[#18191C] rounded-2xl shadow-xl flex flex-col gap-4"
      >
        <h2 className="text-2xl font-semibold text-center">Login</h2>

        {/* Email */}
        <div className="flex flex-col gap-1">
          <label>Email</label>
          <input
            type="email"
            {...register("email", { required: "Email is required" })}
            placeholder="you@example.com"
            className="p-3 rounded-lg bg-[#232428] border border-gray-700 focus:border-indigo-600 outline-none"
          />
          {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
        </div>

        {/* Password */}
        <div className="flex flex-col gap-1 relative">
          <label>Password</label>
          <input
            type={showPassword ? "text" : "password"}
            {...register("password", { required: "Password required" })}
            placeholder="******"
            className="p-3 rounded-lg bg-[#232428] border border-gray-700 focus:border-indigo-600 outline-none"
          />
          <span
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-10 text-sm text-gray-400 cursor-pointer"
          >
            {showPassword ? "Hide" : "Show"}
          </span>
          {errors.password && <span className="text-red-500 text-sm">{errors.password.message}</span>}
        </div>

        {/* Login Button */}
        <button type="submit" className="mt-4 py-3 bg-indigo-600 hover:bg-indigo-700 rounded-lg font-medium">
          Login
        </button>

        {/* Register Link */}
        <p className="text-center text-gray-400 text-sm mt-2">
          Don't have an account?{" "}
          <Link to="/register" className="text-indigo-400 hover:underline">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;