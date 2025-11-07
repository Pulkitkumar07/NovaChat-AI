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
        await axios.post(
        "http://localhost:3000/api/auth/register",
        {
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          password: data.password,
        })
        .then((res) => {
          console.log("register success", res);
          navigate("/login");
        })
    } catch (err) {
      console.log("error", err);
      alert(err.response?.data?.message || "Something went wrong");
    }

  }

  return (
    <div className={` bg-gray-900 text-white  min-h-screen flex items-center justify-center`}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={` bg-gray-800  w-96 p-6 rounded-2xl shadow-xl`}
      >
        <h2 className="text-2xl font-semibold mb-6 text-center">Create Account</h2>

        <label>First Name</label>
        <input
          {...register("firstName", { required: "First name is required" })}
          placeholder="Enter first name"
          className="w-full mt-1 mb-2 p-2 rounded bg-gray-700 text-white outline-none"
        />
        {errors.firstName && <p className="text-red-400 text-sm">{errors.firstName.message}</p>}

        <label className="mt-3 block">Last Name</label>
        <input
          {...register("lastName", { required: "Last name is required" })}
          placeholder="Enter last name"
          className="w-full mt-1 mb-2 p-2 rounded bg-gray-700 text-white outline-none"
        />
        {errors.lastName && <p className="text-red-400 text-sm">{errors.lastName.message}</p>}

        <label className="mt-3 block">Email</label>
        <input
          type="email"
          {...register("email", { required: "Email is required" })}
          placeholder="you@example.com"
          className="w-full mt-1 mb-2 p-2 rounded bg-gray-700 text-white outline-none"
        />
        {errors.email && <p className="text-red-400 text-sm">{errors.email.message}</p>}

        <label className="mt-3 block">Password</label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            {...register("password", { required: "Password is required", minLength: { value: 6, message: "Min 6 characters" } })}
            placeholder="******"
            className="w-full mt-1 p-2 rounded bg-gray-700 text-white outline-none"
          />
          <span
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-2 top-3 text-sm cursor-pointer"
          >
            {showPassword ? "Hide" : "Show"}
          </span>
        </div>
        {errors.password && <p className="text-red-400 text-sm">{errors.password.message}</p>}

        <button
          type="submit"
          className="w-full mt-6 bg-indigo-600 hover:bg-indigo-700 py-2 rounded font-medium"
        >
          Register
        </button>


        <p className="mt-4 text-center text-sm">
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
