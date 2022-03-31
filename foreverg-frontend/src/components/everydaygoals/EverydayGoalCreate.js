import React from "react";
import{ connect} from "react-redux";
import { Link } from "react-router-dom";
import {createEverydayGoal} from "../../actions"
import EverydayGoalForm from "./EverydayGoalForm";

class EverydayGoalCreate extends React.Component {
    onSubmit =(formValues)=> {
        this.props.createEverydayGoal(formValues);
        
    }

    render(){
        return (
            <div>
                <h3>Create a new everyday goal</h3>
                <EverydayGoalForm onSubmit={this.onSubmit}/>
                <br />
                <Link to="/goals" className="item">
                    Go Back
                </Link>
            </div>
        )
    }
}



export default connect(null, {createEverydayGoal})(EverydayGoalCreate);