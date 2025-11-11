import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const res = await axios.post(
        "http://localhost:3000/api/auth/register",
        {
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          password: data.password,
        }
      );

      console.log("Register success", res);
      navigate("/login");
    } catch (err) {
      console.log("Error", err);
      alert(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0F0F10] text-white">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-96 p-6 bg-[#18191C] rounded-2xl shadow-xl flex flex-col gap-4"
      >
        <h2 className="text-2xl font-semibold text-center">Create Account</h2>

        {/* First Name */}
        <div className="flex flex-col gap-1">
          <label>First Name</label>
          <input
            {...register("firstName", { required: "First name is required" })}
            placeholder="Enter first name"
            className="p-3 rounded-lg bg-[#232428] border border-gray-700 focus:border-indigo-600 outline-none"
          />
          {errors.firstName && <span className="text-red-500 text-sm">{errors.firstName.message}</span>}
        </div>

        {/* Last Name */}
        <div className="flex flex-col gap-1">
          <label>Last Name</label>
          <input
            {...register("lastName", { required: "Last name is required" })}
            placeholder="Enter last name"
            className="p-3 rounded-lg bg-[#232428] border border-gray-700 focus:border-indigo-600 outline-none"
          />
          {errors.lastName && <span className="text-red-500 text-sm">{errors.lastName.message}</span>}
        </div>

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
            {...register("password", { 
              required: "Password is required", 
              minLength: { value: 6, message: "Min 6 characters" } 
            })}
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

        {/* Register Button */}
        <button className="mt-4 py-3 bg-indigo-600 hover:bg-indigo-700 rounded-lg font-medium">
          Register
        </button>

        {/* Login Link */}
        <p className="text-center text-gray-400 text-sm mt-2">
          Already have an account?{" "}
          <Link to="/login" className="text-indigo-400 hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
