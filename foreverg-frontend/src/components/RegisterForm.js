import React from "react";
import { Field, reduxForm } from "redux-form";

class RegisterForm extends React.Component {
    //spread all inputs into input elements
    //we wire up the custom input to be controlled by redux
    renderInput=({input, label, type, meta})=>{
        const className=`field ${meta.error && meta.touched ? 'error': ''}`;
        return (<div className={className}>
                    <label>{label}</label>
                    <input {...input} type={type} autoComplete="off"/>
                    {this.renderError(meta)}
                </div>)
    }


    //we do not want to show the error when the first time the form's elements got rendered, but only when it is being clicked then clicked away
    renderError({error, touched}){
        if(touched && error){
            return (
                <div className="ui error message">
                    <div className="header">
                        {error}
                    </div>
                </div>
            )
        }

    }

    onSubmit =(formValues)=> {
        //we received the formValues by passing this method as the argument to the handleSubmit from redux-form, so we get the actual form values
        this.props.onSubmit(formValues);    
    }
    //component props used to tell how to render each input, because Field does not knwo how to render itself
    //onSubmit here gonna use the handleSubmit from redux-form and change our own onSubmit
    render(){
        return (
            <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui form error">
                <Field name="username" component={this.renderInput} label="Enter your email" type="email"/>
                <Field name="password" component={this.renderInput} label="Enter password" type="password"/>
                <Field name="password_repeat" component={this.renderInput} label="Enter password again" type="password"/>
  
                <Field name="first_name" component={this.renderInput} label="Enter you first name" type="text"/>
                <Field name="last_name" component={this.renderInput} label="Enter your last name" type="text"/>
                <button className="ui button primary">Register</button>
            </form>
        )
    }
}
const passwordCheck = (password) => {
    let isContainCapitalLetters = false;
    let isContainLowerCaseLetters = false;
    let isContainNumber = false;
    const capicalLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowerCaseLetters = "abcdefghijklmnopqrstuvwxyz";
    const numbersString = "1234567890";
    for(let i = 0; i < capicalLetters.length; i++){
        if(password.includes(capicalLetters.charAt(i))){
            isContainCapitalLetters = true;
            break;
        }
    }
    if(isContainCapitalLetters === false) return false;
    for(let i = 0; i < lowerCaseLetters.length; i++){
        if(password.includes(lowerCaseLetters.charAt(i))){
            isContainLowerCaseLetters = true;
            break;
        }
    }
    if(isContainLowerCaseLetters === false) return false;

    for(let i = 0; i < numbersString.length; i++){
        if(password.includes(numbersString.charAt(i))){
            isContainNumber = true;
            break;
        }
    }

    if(isContainNumber === false) return false;

    return true;
}
const validate = (formValues) => {
    const errors = {};

    //if any of our field been named as the same as errors object keys, then it knows which field has been entered in-correctly
    //it will pass down to that field's component custom render method
    if(!formValues.username) {
        errors.username="You must enter a valid email";
    }

    if(!formValues.password) {
        errors.password="You must enter a password";
    }

    if(!formValues.password_repeat) {
        errors.password_repeat="password does not match";
    }

    if(formValues.password_repeat !== formValues.password) {
        errors.password_repeat="password does not match";
    }

    if(formValues.password && formValues.password.length < 8) {
        errors.password="password needs to be at least 8 characters long";
    }

    if(formValues.password && !passwordCheck(formValues.password)) {
        errors.password="password needs contains at least 1 Capital letter, 1 lower case letter and at least a number";
    }

    if(!formValues.first_name) {
        errors.first_name="You must enter your first name";
    }

    if(!formValues.last_name) {
        errors.last_name="You must enter your last name";
    }

    //return of empty object will let redux-form thinks user did not enter anything in-correctly
    return errors;
}

//Hook up reduxform to this form as reduxForm, with configuration, form with name "everydayGoalForm"
//hook up our custom validate into the reduxForm, so that it knows to use our custom validate method
export default reduxForm({
    form: "registerForm",
    validate
})(RegisterForm);
