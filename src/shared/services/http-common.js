import axios from "axios";

export default axios.create({
  baseURL: "http://hbcordova-001-site1.htempurl.com/api/v1",
  headers: { "Content-type": "application/json" },
});
