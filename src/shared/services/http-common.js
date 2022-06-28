import axios from "axios";

export default axios.create({
  baseURL: "https://armorfeedapi20220628174808.azurewebsites.net/api/v1",
  headers: { "Content-type": "application/json" },
});
