import axios from "axios";
//local URL baseURL:"http://localhost:8000"

export default axios.create({
    baseURL:"https://forever-g-backend.herokuapp.com"
})