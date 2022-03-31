import React from "react";
import { Link } from "react-router-dom";
const HomePage = () =>{
    return (
        <div>
            <h1>Welcome to Forever G</h1>
            <p>In here you can track your goal progress</p>
            Please <Link to="/signin" className="item">
                Log in 
            </Link> Or <Link to="/register" className="item">
                Register
            </Link> to get started
        </div>
    )
}

export default HomePage;