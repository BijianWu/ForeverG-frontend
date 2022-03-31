import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchEverydayGoal } from "../../actions";

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
        const {title, description} = this.props.stream;
        return (
            <div>
                <h1>Title: {title}</h1>
                <h5>Description: {description}</h5>
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