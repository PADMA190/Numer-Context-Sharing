import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: { "Content-Type": "application/json" }
});

const sendNumer = (payload) => api.post("/api/numer", payload);
export default sendNumer;