import React from "react";
import{ connect} from "react-redux";
import { Link } from "react-router-dom";
import {createEverydayGoal, addNotification} from "../../actions"
import { EVERY_DAY_GOALS_HOME_PAGE_LINK } from "../../constants/pagesLink";
import history from "../../history";
import { MAX_EVERYDAY_GOALS } from "../../myConfig";
import EverydayGoalForm from "./EverydayGoalForm";

class EverydayGoalCreate extends React.Component {
    onSubmit =(formValues)=> {
        if(this.props.everydayGoals.length >= MAX_EVERYDAY_GOALS){
            this.props.addNotification({type: "ERROR", title: `Max ${MAX_EVERYDAY_GOALS} goals limit reached`,message: 'please delete some if you want to add more to it'});
            history.push(EVERY_DAY_GOALS_HOME_PAGE_LINK);
            return;
        }
        this.props.createEverydayGoal(formValues);
        
    }

    render(){
        return (
            <div>
                <h3>Create a new everyday goal</h3>
                <EverydayGoalForm onSubmit={this.onSubmit}/>
                <br />
                <Link to={`${EVERY_DAY_GOALS_HOME_PAGE_LINK}`} className="item">
                    Go Back
                </Link>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return { 
        everydayGoals: Object.values(state.everydayGoals), 
    };
};

export default connect(mapStateToProps, {createEverydayGoal, addNotification})(EverydayGoalCreate);