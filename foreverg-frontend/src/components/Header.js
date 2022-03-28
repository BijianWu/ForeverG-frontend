import React from "react";
import { Link } from "react-router-dom";
import DjangoAuth from "./DjangoAuth";
const Header = () => {
    return (
        <div className="ui secondary pointing menu">
            <Link to="/" className="item">
                Streamer
            </Link>
            <div className="right menu">
                <Link to="/" className="item">
                    All Eveyday goals
                </Link>
                <DjangoAuth />
            </div>
        </div>
    )
}

export default Header;