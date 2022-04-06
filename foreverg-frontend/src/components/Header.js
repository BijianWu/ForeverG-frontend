import React from "react";
import { Link } from "react-router-dom";
import DjangoAuth from "./DjangoAuth";
const Header = () => {
    return (
        <div className="ui secondary pointing menu">
            <Link to="/" className="item header">
                Forever G
            </Link>
            <div className="right menu">
                <Link to="/" className="item header">
                    Home
                </Link>
                <DjangoAuth />
            </div>
        </div>
    )
}

export default Header;