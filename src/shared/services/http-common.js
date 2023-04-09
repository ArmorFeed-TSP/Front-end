import axios from "axios";

export default axios.create({
  baseURL: "https://back-end-production-fb3b.up.railway.app/api/v1",
  headers: { "Content-type": "application/json" },
});
