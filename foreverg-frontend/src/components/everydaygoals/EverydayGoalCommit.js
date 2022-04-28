import React from "react";
import history from "../../history";
import Modal from "../Modal";
import {connect} from "react-redux";
import {fetchEverydayGoal, deleteEverydayGoal, commitEverydayGoal} from "../../actions"
import { Link } from "react-router-dom";
import { EVERY_DAY_GOALS_HOME_PAGE_LINK } from "../../constants/pagesLink";

class EverydayGoalCommit extends React.Component {
    renderActions (){
        return (
            <React.Fragment>
                <button onClick={() => this.props.commitEverydayGoal(this.props.match.params.id)} className="ui button negative">Commit</button>
                <button onClick={()=>history.goBack()}  className="ui button">Cancel</button>
            </React.Fragment>
        );
    }
    componentDidMount(){
        this.props.fetchEverydayGoal(this.props.match.params.id);
    }

    renderContent() {
        if(!this.props.everydayGoal) {
            return "Are you sure you want to commit this everyday goal?";
        }

        return `Are you sure you want to commit the everyday goal with title: ${this.props.everydayGoal.title}`;
    }

    render(){
        return (
            <Modal title="Commit Everyday Goal" content={this.renderContent()} actions={this.renderActions()} onDismiss={()=>history.goBack()}/>
        );
    }

};

const mapStateToProps = (state, ownProps) => {
    return {everydayGoal: state.everydayGoals[ownProps.match.params.id]}
};

export default connect(mapStateToProps, {fetchEverydayGoal, deleteEverydayGoal, commitEverydayGoal})(EverydayGoalCommit);