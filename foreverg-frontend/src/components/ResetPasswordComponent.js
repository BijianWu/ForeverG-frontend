import React from "react";
import{ connect} from "react-redux";
import { Link } from "react-router-dom";
import apis from "../apis/apis";
import { HOME_PAGE_LINK, REGISTER_PAGE_LINK } from "../constants/pagesLink";
import history from "../history";
import { parseJwt } from "../utils/jsonParser";
import ResetPasswordForm from "./ResetPasswordForm";
import SignInForm from "./SignInForm";

class ResetPasswordComponent extends React.Component {
    constructor(props){
        super(props);
        this.state = {isSent: false};
    }
    onSubmit = async (formValues)=> {
        this.setState({
            isSent: true
          });
        apis.post("/request-reset-email", {email: formValues.email});
    }

    render(){
        let renderElement =             
        <div className="container">
            <h3>Reset password form</h3>
            <p>Enter your registered email below to get the reset link send to your email</p>
            <ResetPasswordForm onSubmit={this.onSubmit}/>
        </div>

        if(this.state && this.state.isSent){
            renderElement = 
                <div className="container">
                    <h3>Email has been sent to the email you provided here, if your emai is registed with us, then you will receive the reset password email.</h3>
                </div>
        }

        return (
            renderElement
        )
    }
}


export default connect(null, {})(ResetPasswordComponent);