import React from "react";
import{ connect} from "react-redux";
import { Link } from "react-router-dom";
import {createFutureTask, addNotification} from "../../actions"
import { FUTRUE_TASKS_HOME_PAGE_LINK } from "../../constants/pagesLink";
import history from "../../history";
import { MAX_FUTURE_TASKS } from "../../myConfig";
import FutureTaskCreateForm from "./FutureTaskCreateForm";

class FutureTaskCreate extends React.Component {
    onSubmit =(formValues)=> {
        if(this.props.futureTasks.length >= MAX_FUTURE_TASKS){
            this.props.addNotification({type: "ERROR", title: `Max ${MAX_FUTURE_TASKS} tasks limit reached`,message: 'please delete some if you want to add more to it'});
            history.push(FUTRUE_TASKS_HOME_PAGE_LINK);
            return;
        }
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

const mapStateToProps = (state) => {
    return { 
        futureTasks: Object.values(state.futureTasks), 
    };
};

export default connect(mapStateToProps, {createFutureTask, addNotification})(FutureTaskCreate);