import React from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";

const Head = ({ setLoggedIn, setToken }) => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    setLoggedIn(false);
    navigate("/");
  };

  return (
    <div className="bg-acadia-3 text-offwhite">
      <div className="flex w-5/6 mx-auto py-1 md:py-2 items-center justify-between">
        <div className="h-12 w-12 md:h-20 md:w-20">
          <img className="shadow-lg rounded-lg" src={assets.logo} alt="logo" />
        </div>
        <div className="hidden sm:flex flex-col text-center">
          <h1 className="px-2 md:px-16 py-2 text-lg md:text-xl lg:text-2xl tracking-wide">
            D'Alia Admin Panel
          </h1>
        </div>
        <button
          onClick={logout}
          className="px-3 md:px-4 py-1 text-xs md:text-base bg-acadia rounded-lg border-2 border-acadia-2 shadow-lg hover:border-gainsboro"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Head;
