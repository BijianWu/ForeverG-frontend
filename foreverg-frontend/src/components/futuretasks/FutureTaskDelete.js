import React from "react";
import history from "../../history";
import Modal from "../Modal";
import {connect} from "react-redux";
import {fetchFutureTask, deleteFutureTask} from "../../actions"
import { Link } from "react-router-dom";
import { FUTRUE_TASKS_HOME_PAGE_LINK } from "../../constants/pagesLink";

class FutureTaskDelete extends React.Component {
    renderActions (){
        return (
            <React.Fragment>
                <button onClick={() => this.props.deleteFutureTask(this.props.match.params.id)} className="ui button negative">Delete</button>
                <Link to={`${FUTRUE_TASKS_HOME_PAGE_LINK}`}  className="ui button">Cancel</Link>
            </React.Fragment>
        );
    }
    componentDidMount(){
        this.props.fetchFutureTask(this.props.match.params.id);
    }

    renderContent() {
        if(!this.props.futureTask) {
            return "Are you sure you want to delete this future task?";
        }

        return `Are you sure you want to delete the future task with title: ${this.props.futureTask.title}`;
    }

    render(){
        return (
            <Modal title="Delete Future Task" content={this.renderContent()} actions={this.renderActions()} onDismiss={()=>history.push(`${FUTRUE_TASKS_HOME_PAGE_LINK}`)}/>
        );
    }

};

const mapStateToProps = (state, ownProps) => {
    return {futureTask: state.futureTasks[ownProps.match.params.id]}
};

export default connect(mapStateToProps, {fetchFutureTask, deleteFutureTask})(FutureTaskDelete);