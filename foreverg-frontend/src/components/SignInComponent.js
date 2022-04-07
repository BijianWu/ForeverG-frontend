import React from "react";
import{ connect} from "react-redux";
import { Link } from "react-router-dom";
import {signIn, fetchEverydayGoals, addNotification} from "../actions"
import apis from "../apis/apis";
import { HOME_PAGE_LINK, REGISTER_PAGE_LINK } from "../constants/pagesLink";
import history from "../history";
import { parseJwt } from "../utils/jsonParser";
import SignInForm from "./SignInForm";

class RegisterComponent extends React.Component {
    onSubmit = async (formValues)=> {
        await apis.post("/auth/jwt/create/", {username: formValues.username, password: formValues.password})
        .then(
            res => {
                this.props.addNotification({type: "SUCCESS", title: 'Logged in',message: 'successfully logged in'});
                const getParsedData = parseJwt(res.data.access);
                if (typeof(Storage) !== "undefined") {
                    localStorage.setItem("FOREVER_G_TOKEN", res.data.access);   
                }
        
                this.props.signIn(getParsedData.user_id, res.data.access);
        
                this.props.fetchEverydayGoals();
        
                history.push(`${HOME_PAGE_LINK}/`);
            }
        )
        .catch(
            e => {
                this.props.addNotification({type: "ERROR", title: 'Failed to log in',message: 'please try again'});
        })



    }

    render(){
        return (
            <div>
                <h3>Log in</h3>
                <SignInForm onSubmit={this.onSubmit}/>
                Don't have an account? <Link to={`${REGISTER_PAGE_LINK}`} className="item">
                Register
            </Link> Now
            </div>
        )
    }
}



export default connect(null, {signIn, fetchEverydayGoals, addNotification})(RegisterComponent);