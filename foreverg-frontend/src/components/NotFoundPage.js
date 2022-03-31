import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
    return (
        <div>
            Page Not Found.
            Go Back To <Link to="/" className="item">
                    Home
                </Link> Page
        </div>
    )
}

export default NotFoundPage;