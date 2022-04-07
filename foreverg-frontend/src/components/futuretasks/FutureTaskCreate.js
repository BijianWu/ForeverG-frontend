import React from "react";
import{ connect} from "react-redux";
import { Link } from "react-router-dom";
import {createFutureTask} from "../../actions"
import { FUTRUE_TASKS_HOME_PAGE_LINK } from "../../constants/pagesLink";
import FutureTaskCreateForm from "./FutureTaskCreateForm";

class FutureTaskCreate extends React.Component {
    onSubmit =(formValues)=> {
        this.props.createFutureTask(formValues);
    }

    render(){
        return (
            <div>
                <h3>Create a new Future Task</h3>
                <FutureTaskCreateForm onSubmit={this.onSubmit}/>
                <br />
                <Link to={`${FUTRUE_TASKS_HOME_PAGE_LINK}`} className="item">
                    Go Back
                </Link>
            </div>
        )
    }
}



export default connect(null, {createFutureTask})(FutureTaskCreate);