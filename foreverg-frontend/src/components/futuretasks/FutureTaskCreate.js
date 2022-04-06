import React from "react";
import{ connect} from "react-redux";
import { Link } from "react-router-dom";
import {createFutureTask} from "../../actions"
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
                <Link to="/futuretasks" className="item">
                    Go Back
                </Link>
            </div>
        )
    }
}



export default connect(null, {createFutureTask})(FutureTaskCreate);