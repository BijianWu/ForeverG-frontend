import React from "react";
import { Link } from "react-router-dom";
import { HOME_PAGE_LINK } from "../constants/pagesLink";

const NotFoundPage = () => {
    return (
        <div>
            Page Not Found.
            Go Back To <Link to={`${HOME_PAGE_LINK}`} className="item">
                    Home
                </Link> Page
        </div>
    )
}

export default NotFoundPage;