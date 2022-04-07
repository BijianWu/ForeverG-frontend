import React from "react";
import { connect } from "react-redux";
import { fetchEverydayGoal, editEverydayGoal } from "../../actions";
import EveryDayGoalForm from "./EverydayGoalForm";
import _ from "lodash";
import { Link } from "react-router-dom";
import { EVERY_DAY_GOALS_HOME_PAGE_LINK } from "../../constants/pagesLink";

class EverydayGoalEdit extends React.Component {
    componentDidMount() {
        this.props.fetchEverydayGoal(this.props.match.params.id);
    }

    onSubmit =(formValues) => {
        this.props.editEverydayGoal(this.props.match.params.id, formValues);
    }

    render() {
        if(!this.props.stream){
            return <div>Loading..</div>
        }
        return (
            <div>
                <h3>Edit a Everyday goal</h3>
                <EveryDayGoalForm initialValues={_.pick(this.props.stream, "title", "description")} onSubmit={this.onSubmit}/>
                <br />
                <Link to={`${EVERY_DAY_GOALS_HOME_PAGE_LINK}`} className="item">
                    Go Back
                </Link>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {stream: state.streams[ownProps.match.params.id]};
}

export default connect(mapStateToProps, {fetchEverydayGoal, editEverydayGoal})(EverydayGoalEdit);