import React from "react";
import { Link } from "react-router-dom";
import { HOME_PAGE_LINK } from "../constants/pagesLink";
import DjangoAuth from "./DjangoAuth";
const Header = () => {
    return (
        <div className="ui secondary pointing menu">
            <Link to={`${HOME_PAGE_LINK}`} className="item header">
                Forever G
            </Link>
            <div className="right menu">
                <Link to={`${HOME_PAGE_LINK}`} className="item header">
                    Home
                </Link>
                <DjangoAuth />
            </div>
        </div>
    )
}

export default Header;