import axios from "axios";

export default axios.create({
  baseURL: "https://back-end-production-9e82.up.railway.app/api/v1",
  headers: { "Content-type": "application/json" },
});
