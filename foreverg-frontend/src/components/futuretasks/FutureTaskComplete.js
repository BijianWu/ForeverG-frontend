import React from "react";
import history from "../../history";
import Modal from "../Modal";
import {connect} from "react-redux";
import {fetchFutureTask, completeFutureTask} from "../../actions"
import { Link } from "react-router-dom";

class FutureTaskComplete extends React.Component {
    renderActions (){
        return (
            <React.Fragment>
                <button onClick={() => this.props.completeFutureTask(this.props.match.params.id)} className="ui button negative">Comlete</button>
                <Link to="/futuretasks"  className="ui button">Cancel</Link>
            </React.Fragment>
        );
    }
    componentDidMount(){
        this.props.fetchFutureTask(this.props.match.params.id);
    }

    renderContent() {
        if(!this.props.futureTask) {
            return "Are you sure you have completed this future task?";
        }

        return `Are you sure you have completed the future task with title: ${this.props.futureTask.title}`;
    }

    render(){
        return (
            <Modal title="Complete the task" content={this.renderContent()} actions={this.renderActions()} onDismiss={()=>history.push("/futuretasks")}/>
        );
    }

};

const mapStateToProps = (state, ownProps) => {
    return {futureTask: state.futureTasks[ownProps.match.params.id]}
};

export default connect(mapStateToProps, {fetchFutureTask, completeFutureTask})(FutureTaskComplete);