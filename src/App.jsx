import React, { useEffect, useState } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Head from "./components/Head";
import Navbar from "./components/Navbar";
import List from "./pages/List";
import Add from "./pages/Add";
import Login from "./pages/Login";
import Orders from "./pages/Orders";

const App = () => {
  const API_URL = "http://156.67.220.12:3000";
  const [loggedIn, setLoggedIn] = useState(false);
  const [token, setToken] = useState("");

  let timeoutId;

  // Megantur ulang timeout otomatis setelah 30 menit tidak ada aktivitas
  const resetTimeout = () => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      localStorage.removeItem("token");
      setLoggedIn(false);
      setToken("");
    }, 1800000);
  };

  // Mengecek token di localStorage
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setToken(token);
      setLoggedIn(true);
      resetTimeout();
    }
  }, []);

  // Event listener untuk reset timeout saat ada aktivitas
  useEffect(() => {
    const events = ["mousedown", "keydown", "touchstart"];
    const resetTimer = () => {
      resetTimeout();
    };
    events.forEach((event) => {
      window.addEventListener(event, resetTimer);
    });

    return () => {
      events.forEach((event) => {
        window.removeEventListener(event, resetTimer);
      });
    };
  }, []);

  return (
    <div className="font-roboto h-full flex flex-col">
      {loggedIn ? (
        <>
          <ToastContainer />
          <Head setLoggedIn={setLoggedIn} setToken={setToken} />
          <hr className="w-full border-acadia-2 shadow-lg" />
          <Navbar />
          <Routes>
            <Route path="/" element={<List API_URL={API_URL} />} />
            <Route path="/add" element={<Add API_URL={API_URL} />} />
            <Route path="/list" element={<List API_URL={API_URL} />} />
            <Route path="/orders" element={<Orders API_URL={API_URL} />} />
          </Routes>
        </>
      ) : (
        <Login
          setLoggedIn={setLoggedIn}
          API_URL={API_URL}
          setToken={setToken}
        />
      )}
    </div>
  );
};

export default App;
