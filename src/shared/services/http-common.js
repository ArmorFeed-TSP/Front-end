import axios from "axios";

export default axios.create({
  //baseURL: "https://webapp-armorfeed-54267432.azurewebsites.net/api/v1",
  baseURL: "http://localhost:5017/api/v1",
  headers: { "Content-type": "application/json" },
});
