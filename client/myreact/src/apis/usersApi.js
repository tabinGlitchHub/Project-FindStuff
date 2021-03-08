import axios from "axios";

//instance of axios with base url
export default axios.create({
	baseURL: "http://localhost:3000/api/v1/users",
});
