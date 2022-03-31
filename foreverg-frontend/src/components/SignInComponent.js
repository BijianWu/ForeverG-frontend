import React from "react";
import{ connect} from "react-redux";
import {signIn, fetchEverydayGoals} from "../actions"
import goals from "../apis/goals";
import history from "../history";
import { parseJwt } from "../utils/jsonParser";
import SignInForm from "./SignInForm";

class RegisterComponent extends React.Component {
    onSubmit = async (formValues)=> {
        console.log("log in with user name "  + formValues.username + " , and password " + formValues.password);
        const res = await goals.post("/auth/jwt/create/", {username: formValues.username, password: formValues.password});
        console.log("receveid the log in Successfull with following data");

        console.log(res);
        const getParsedData = parseJwt(res.data.access);
        if (typeof(Storage) !== "undefined") {
            localStorage.setItem("FOREVER_G_TOKEN", res.data.access);   
        }

        this.props.signIn(getParsedData.user_id, res.data.access);

        this.props.fetchEverydayGoals();

        history.push("/goals")
    }

    render(){
        return (
            <div>
                <h3>Registering a new account</h3>
                <SignInForm onSubmit={this.onSubmit}/>
            </div>
        )
    }
}



export default connect(null, {signIn, fetchEverydayGoals})(RegisterComponent);