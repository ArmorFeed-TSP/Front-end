import axios from "axios";

// Base Api url
export default axios.create({
  baseURL: "https://armorfeedapitsp.azurewebsites.net/api/v1",
  //baseURL: "http://localhost:5017/api/v1",
  headers: { "Content-type": "application/json" },
});
