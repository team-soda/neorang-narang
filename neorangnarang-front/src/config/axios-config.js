import axios from "axios";

const accessToken = localStorage.getItem("accessToken");

const instance = axios.create({
  baseURL: "http://localhost:8081",
  headers: {
    "Content-type": "application/json",
    Authorization: "Bearer " + accessToken,
  },
});

export default instance;
