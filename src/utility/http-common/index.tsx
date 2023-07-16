import axios from "axios";
export default axios.create({
  baseURL: "https://apitester.ir/api",
  headers: {
    "Content-type": "application/json"
  }
});
