import React from "react";
import{ connect} from "react-redux";
import { Link } from "react-router-dom";
import {register} from "../actions"
import { HOME_PAGE_LINK, SIGN_IN_PAGE_LINK } from "../constants/pagesLink";
import history from "../history";
import RegisterForm from "./RegisterForm";

class RegisterComponent extends React.Component {
    componentDidMount(){
        if (typeof(Storage) !== "undefined") {
            // Code for localStorage/sessionStorage.
            if(localStorage.getItem("FOREVER_G_TOKEN")){
                history.push(`${HOME_PAGE_LINK}`);
            }
        }
        // if(this.props.isSignedIn && this.props.isSignedIn === true) {
            
        // }
    }

    onSubmit =(formValues)=> {
        this.props.register(formValues);
    }

    render(){
        return (
            <div>
                <h3>Registering a new account</h3>
                <RegisterForm onSubmit={this.onSubmit}/>
                Already have an account? <Link to={`${SIGN_IN_PAGE_LINK}`} className="item">
                Sign In
            </Link>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return { 
        currentUserId: state.auth.userId,
        isSignedIn: state.auth.isSignedIn
    };
};


export default connect(mapStateToProps, {register})(RegisterComponent);