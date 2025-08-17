// src/hooks/useAxiosSecure.js
import { useEffect } from "react";
import axios from "axios";

const useAxiosSecure = () => {
  const instance = axios.create({
    baseURL: "https://blood-donation-serverset.vercel.app/", 
  });

  // যদি JWT বা token add করতে চাও
  instance.interceptors.request.use(config => {
    const token = localStorage.getItem("access-token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  return instance;
};

export default useAxiosSecure;
