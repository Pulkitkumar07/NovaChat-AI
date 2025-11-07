import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link,useNavigate } from "react-router-dom";
import axios from "axios";
const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const [showPassword, setShowPassword] = useState(false);
  
   const navigate=useNavigate();
 const onSubmit = async (data) => {
  try {
    const res = await axios.post(
      "http://localhost:3000/api/auth/login",
      {
        email: data.email,
        password: data.password,
      },
      {
        withCredentials: true, 
      }
    ).then((res)=>{
       console.log("login success", res);
    navigate("/"); 

    })

   
  } catch (err) {
    console.log("error", err);
    alert(err.response?.data?.message || "Something went wrong");
  }

  }

  return (
    <div className={`bg-gray-900 text-white min-h-screen flex items-center justify-center`}>

    
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={`bg-gray-800 w-96 p-6 rounded-2xl shadow-xl`}
      >
        <h2 className="text-2xl font-semibold mb-6 text-center">Login</h2>

      
        <label>Email</label>
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
            {...register("password", { required: "Password required" })}
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
          Login
        </button>
        
    <p className="mt-4 text-center text-sm">
          User don't have an account?{" "}
          <Link to="/register" className="text-indigo-400 hover:underline">
            Register
          </Link>
        </p>

      </form>
    </div>
  );
};

export default Login;
