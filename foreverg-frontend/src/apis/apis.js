import axios from "axios";
import { isTestingLocally } from "../myConfig";
//local URL baseURL:"http://localhost:8000"
//remove URL base ULR: "https://forever-g-backend.herokuapp.com"

export default axios.create({
    baseURL: isTestingLocally? "http://localhost:8000": "https://forever-g-backend.herokuapp.com"
})