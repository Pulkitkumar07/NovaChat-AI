import React from 'react'

const PageNotFound = () => {
  
    return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-[#343541] text-white px-4">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-lg text-gray-300 mb-6 text-center">
        Oops! The page you're looking for doesn't exist.
      </p>

      <a
        href="/"
        className="px-6 py-3 bg-[#10A37F] rounded-md font-medium hover:bg-[#0d8a6c] transition"
      >
        Go Back Home
      </a>
    </div>
  );
}

export default PageNotFound
