import React from "react";
import { connect } from "react-redux";
import { fetchFutureTask, editFutureTask } from "../../actions";
import _ from "lodash";
import { Link } from "react-router-dom";
import FutureTaskEditForm from "./FutureTaskEditForm";
import { FUTRUE_TASKS_HOME_PAGE_LINK } from "../../constants/pagesLink";

class FutureTaskEdit extends React.Component {
    componentDidMount() {
        this.props.fetchFutureTask(this.props.match.params.id);
    }

    onSubmit =(formValues) => {
        this.props.editFutureTask(this.props.match.params.id, formValues);
    }

    render() {
        if(!this.props.futureTask){
            return <div>Loading..</div>
        }
        return (
            <div>
                <h3>Edit the future task</h3>
                <FutureTaskEditForm initialValues={_.pick(this.props.futureTask, "title", "description")} onSubmit={this.onSubmit}/>
                <br />
                <Link to={`${FUTRUE_TASKS_HOME_PAGE_LINK}`} className="item">
                    Go Back
                </Link>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {futureTask: state.futureTasks[ownProps.match.params.id]};
}

export default connect(mapStateToProps, {fetchFutureTask, editFutureTask})(FutureTaskEdit);