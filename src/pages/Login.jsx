import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { assets } from "../assets/assets";
import { toast } from "react-toastify";

const Login = ({ setLoggedIn, API_URL, setToken }) => {
  const [data, setData] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(`${API_URL}/api/admin/login`, data);
      if (response.data.success) {
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);
        setLoggedIn(true);
        navigate("/orders");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Terjadi kesalahan. Silahkan coba lagi");
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleLogin(event);
    }
  };

  return (
    <div className="w-full h-screen bg-acadia text-offwhite flex flex-col justify-center">
      <div className="w-full bg-acadia-3">
        <div className="flex w-5/6 mx-auto py-2 items-center justify-between">
          <div className="h-12 w-12 md:h-20 md:w-20">
            <img
              className="shadow-lg rounded-lg"
              src={assets.logo}
              alt="logo"
            />
          </div>
          <div>
            <h1 className="py-2 text-sm md:text-xl tracking-wide">
              D'Alia Admin Panel
            </h1>
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center flex-grow">
        <form
          onSubmit={handleLogin}
          className="flex flex-col w-auto bg-acadia-3 p-2 md:p-4 px-4 md:px-8 rounded-lg shadow-lg"
        >
          <h2 className="text-center text-sm md:text-xl font-bold p-2 tracking-wide">
            Login
          </h2>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={data.username}
            onChange={onChangeHandler}
            onKeyDown={handleKeyPress}
            className="text-sm md:text-base px-2 md:px-3 py-1 mt-1 md:mt-2 w-56 md:w-64 rounded-lg text-acadia"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={data.password}
            onChange={onChangeHandler}
            onKeyDown={handleKeyPress}
            className="text-sm md:text-base px-2 md:px-3 py-1 mt-2 w-56 md:w-64 rounded-lg text-acadia"
          />
          <button
            type="submit"
            className="text-sm md:text-base py-1 w-full my-3 md:my-4 bg-finch transition duration-200 hover:bg-kelp rounded-lg shadow-lg"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
