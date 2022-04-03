import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchEverydayGoal } from "../../actions";
import { todayDateCreator } from "../../utils/todayDateCreator";

class EverydayGoalDetail extends React.Component {
    constructor(props){
        super(props);

        this.videoRef = React.createRef();
    }

    componentDidMount() {
        const { id } = this.props.match.params;
        this.props.fetchEverydayGoal(id);

        // this.buildPlayer();
    }

    render() {
        if(!this.props.stream){
            return <div>Loading...</div>
        }
        const {title, description, forever_days, updated_at, created_at, id} = this.props.stream;

        let commitElement;

        if (updated_at !== todayDateCreator()) {
            if(forever_days > 0){
                commitElement = <div><h5>commit it or you gonna lose it</h5> <Link to={`/goals/everydaygoals/commit/${id}`} className="ui button secondary">Commit</Link></div> 
            } else {
                <Link to={`/goals/everydaygoals/commit/${id}`} className="ui button secondary">Commit</Link>
            }
        } else {
            commitElement = <p>Committed</p>;
        }
        return (
            <div>
                <h1>Title: {title}</h1>
                <h3>Description: {description}</h3>
                <h5>Created at: {created_at}</h5>
                <h5>Updated at: {updated_at}</h5>
                <h5>Commited days: {forever_days}</h5>
                {commitElement}
                <br />
                <Link to="/goals" className="item">
                    Go Back
                </Link>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return { stream: state.streams[ownProps.match.params.id]};
}

export default connect(mapStateToProps, {fetchEverydayGoal})(EverydayGoalDetail);