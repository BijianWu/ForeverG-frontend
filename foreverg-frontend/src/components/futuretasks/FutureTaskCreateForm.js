import React from "react";
import { Field, reduxForm } from "redux-form";
import { isPassedDeadlineDate } from "../../utils/todayDateCreator";

class FutureTaskCreateForm extends React.Component {
    //spread all inputs into input elements
    //we wire up the custom input to be controlled by redux
    renderInput=({input, label, maxlength, meta})=>{
        const className=`field ${meta.error && meta.touched ? 'error': ''}`;
        return (<div className={className}>
                    <label>{label}</label>
                    <input {...input} autoComplete="off" maxLength={maxlength}/>
                    {this.renderError(meta)}
                </div>)
    }

    renderCheckBox=({input, label, meta})=>{
        const className=`field ${meta.error && meta.touched ? 'error': ''}`;
        return (<div className={className}>
                    <label>{label}</label>
                    <input {...input}  type="checkbox"/>
                    {this.renderError(meta)}
                </div>)
    }

    
    renderDate=({input, label, meta})=>{
        const className=`field ${meta.error && meta.touched ? 'error': ''}`;
        return (<div className={className}>
                    <label>{label}</label>
                    <input {...input}  type="date"/>
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

                <Field name="title" component={this.renderInput} label="Enter new title" maxlength={15}/>
                <Field name="description" component={this.renderInput} label="Enter new description" maxlength={255}/>
                <Field name="deadline_date" component={this.renderDate} label="Enter the dealine date for this future task"/>
                <button className="ui button primary">Submit</button>
            </form>
        )
    }
}

const validate = (formValues) => {
    const errors = {};

    //if any of our field been named as the same as errors object keys, then it knows which field has been entered in-correctly
    //it will pass down to that field's component custom render method
    if(!formValues.title) {
        errors.title="You must enter a title";
    }

    if(!formValues.deadline_date) {
        errors.deadline_date="You must enter a deadline date";
    }

    if(formValues.deadline_date && true === isPassedDeadlineDate(formValues.deadline_date)) {
        errors.deadline_date="You must enter a deadline date that is greater than or same as today";
    }



    //return of empty object will let redux-form thinks user did not enter anything in-correctly
    return errors;
}

//Hook up reduxform to this form as reduxForm, with configuration, form with name "everydayGoalForm"
//hook up our custom validate into the reduxForm, so that it knows to use our custom validate method
export default reduxForm({
    form: "futureTaskCreateForm",
    validate
})(FutureTaskCreateForm);
