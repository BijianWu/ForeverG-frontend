import React from "react";
import{ connect} from "react-redux";
import { Link } from "react-router-dom";
import {register, justUnRegistered} from "../actions"
import { HOME_PAGE_LINK, SIGN_IN_PAGE_LINK } from "../constants/pagesLink";
import history from "../history";
import RegisterForm from "./RegisterForm";

class RegisterComponent extends React.Component {
    componentDidMount(){
        if(this.props && this.props.isJustRegistered && this.props.isJustRegistered === true){
            this.props.justUnRegistered();
        }
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
        let renderElement =              <div>
        <h3>Registering a new account</h3>
        <RegisterForm onSubmit={this.onSubmit}/>
        Already have an account? <Link to={`${SIGN_IN_PAGE_LINK}`} className="item">
        Sign In
    </Link>
    </div>

        if(this.props && this.props.isJustRegistered === true){
            renderElement = <div>
            <div className="ui success message">
            <div className="header">
              Your user registration was successful.
            </div>
            <p>If the email you were used to register is a vailid email, you will receive a email link to activate it before you can log in with your account</p>
          </div>
          <Link to={`${SIGN_IN_PAGE_LINK}`} className="ui secondary basic button">
          Return to login page
    </Link>
          {/* <button class="ui secondary basic button">Return to login page</button> */}
          </div>
        }
        return (
            renderElement
        )
    }
}
const mapStateToProps = (state) => {
    return { 
        currentUserId: state.auth.userId,
        isSignedIn: state.auth.isSignedIn,
        isJustRegistered: state.auth.isJustRegistered,
    };
};


export default connect(mapStateToProps, {register, justUnRegistered})(RegisterComponent);