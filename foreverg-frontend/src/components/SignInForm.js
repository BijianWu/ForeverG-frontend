import React from "react";
import { Field, reduxForm } from "redux-form";

class SignInForm extends React.Component {
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
        console.log(formValues);
        this.props.onSubmit(formValues);    
    }
    //component props used to tell how to render each input, because Field does not knwo how to render itself
    //onSubmit here gonna use the handleSubmit from redux-form and change our own onSubmit
    render(){
        return (
            <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui form error">

                <Field name="username" component={this.renderInput} label="Enter your email" type="email"/>
                <Field name="password" component={this.renderInput} label="Enter password" type="password"/>
                <button className="ui button primary">Log In</button>
            </form>
        )
    }
}

const validate = (formValues) => {
    const errors = {};

    //if any of our field been named as the same as errors object keys, then it knows which field has been entered in-correctly
    //it will pass down to that field's component custom render method
    if(!formValues.username) {
        errors.username="You must enter a correct email";
    }

    if(!formValues.password) {
        errors.password="You must enter a password";
    }

    //return of empty object will let redux-form thinks user did not enter anything in-correctly
    return errors;
}

//Hook up reduxform to this form as reduxForm, with configuration, form with name "everydayGoalForm"
//hook up our custom validate into the reduxForm, so that it knows to use our custom validate method
export default reduxForm({
    form: "signInForm",
    validate
})(SignInForm);
