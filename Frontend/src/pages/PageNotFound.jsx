import React from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const PageNotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-[#0F0F10] text-white px-4">
      
      {/* Glowing Circle Animation */}
      <div className="relative">
        <div className="w-40 h-40 bg-[#1E1F23] rounded-full blur-2xl opacity-40 absolute -top-10 -left-10" />
        <h1 className="relative text-8xl md:text-9xl font-extrabold tracking-wide text-white">
          404
        </h1>
      </div>

      <p className="text-gray-400 text-lg md:text-xl mt-4 text-center max-w-md">
        The page you are looking for might be removed, renamed, or temporarily unavailable.
      </p>

      <button
        onClick={() => navigate("/")}
        className="mt-8 flex items-center gap-2 px-6 py-3 rounded-lg bg-indigo-600 hover:bg-indigo-700 transition font-medium"
      >
        <ArrowLeft size={18} />
        Go Back Home
      </button>

      {/* Footer Text */}
      <p className="text-xs text-gray-600 mt-6">
        NovaPrompt — AI Chat Interface
      </p>
    </div>
  );
};

export default PageNotFound;
