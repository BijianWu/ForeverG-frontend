import React from "react";
import{ connect} from "react-redux";
import { Link } from "react-router-dom";
import {createFutureTask} from "../../actions"
import FutureTaskForm from "./FutureTaskForm";

class FutureTaskCreate extends React.Component {
    onSubmit =(formValues)=> {
        console.log("the form values for creating the future task is as follow ------");
        console.log(formValues);
        this.props.createFutureTask(formValues);
        
    }

    render(){
        return (
            <div>
                <h3>Create a new Future Task</h3>
                <FutureTaskForm onSubmit={this.onSubmit}/>
                <br />
                <Link to="/futuretasks" className="item">
                    Go Back
                </Link>
            </div>
        )
    }
}



export default connect(null, {createFutureTask})(FutureTaskCreate);