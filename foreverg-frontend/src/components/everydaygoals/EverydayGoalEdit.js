import React from "react";
import { connect } from "react-redux";
import { fetchEverydayGoal, editEverydayGoal } from "../../actions";
import EveryDayGoalForm from "./EverydayGoalForm";
import _ from "lodash";

class EverydayGoalEdit extends React.Component {
    componentDidMount() {
        this.props.fetchEverydayGoal(this.props.match.params.id);
    }

    onSubmit =(formValues) => {
        this.props.editEverydayGoal(this.props.match.params.id, formValues);
    }

    render() {
        console.log(this.porps);
        if(!this.props.stream){
            return <div>Loading..</div>
        }
        return (
            <div>
                <h3>Edit a Everyday goal</h3>
                <EveryDayGoalForm initialValues={_.pick(this.props.stream, "title", "description")} onSubmit={this.onSubmit}/>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    console.log(ownProps);
    return {stream: state.streams[ownProps.match.params.id]};
}

export default connect(mapStateToProps, {fetchEverydayGoal, editEverydayGoal})(EverydayGoalEdit);