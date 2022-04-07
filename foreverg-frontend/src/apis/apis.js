import axios from "axios";
//local URL baseURL:"http://localhost:8000"
//remove URL base ULR: "https://forever-g-backend.herokuapp.com"
export default axios.create({
    baseURL:"https://forever-g-backend.herokuapp.com"
})