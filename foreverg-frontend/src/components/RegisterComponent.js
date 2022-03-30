import React from "react";
import{ connect} from "react-redux";
import {register} from "../actions"
import RegisterForm from "./RegisterForm";

class RegisterComponent extends React.Component {
    onSubmit =(formValues)=> {
        this.props.register(formValues);
    }

    render(){
        return (
            <div>
                <h3>Registering a new account</h3>
                <RegisterForm onSubmit={this.onSubmit}/>
            </div>
        )
    }
}



export default connect(null, {register})(RegisterComponent);