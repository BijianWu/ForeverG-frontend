import React from "react";
import history from "../../history";
import Modal from "../Modal";
import {connect} from "react-redux";
import {fetchEverydayGoal, deleteEverydayGoal} from "../../actions"
import { Link } from "react-router-dom";
import { EVERY_DAY_GOALS_HOME_PAGE_LINK } from "../../constants/pagesLink";

class EverydayGoalDelete extends React.Component {
    renderActions (){
        return (
            <React.Fragment>
                <button onClick={() => this.props.deleteEverydayGoal(this.props.match.params.id)} className="ui button negative">Delete</button>
                <Link to={`${EVERY_DAY_GOALS_HOME_PAGE_LINK}`}  className="ui button">Cancel</Link>
            </React.Fragment>
        );
    }
    componentDidMount(){
        this.props.fetchEverydayGoal(this.props.match.params.id);
    }

    renderContent() {
        if(!this.props.everydayGoal) {
            return "Are you sure you want to delete this everyday goal?";
        }

        return `Are you sure you want to delete the everyday goal with title: ${this.props.everydayGoal.title}`;
    }

    render(){
        return (
            <Modal title="Delete Everyday" content={this.renderContent()} actions={this.renderActions()} onDismiss={()=>history.goBack()}/>
        );
    }

};

const mapStateToProps = (state, ownProps) => {
    return {everydayGoal: state.everydayGoals[ownProps.match.params.id]}
};

export default connect(mapStateToProps, {fetchEverydayGoal, deleteEverydayGoal})(EverydayGoalDelete);