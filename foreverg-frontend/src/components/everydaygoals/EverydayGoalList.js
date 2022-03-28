import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {fetchEverydayGoals} from "../../actions"

class EverydayGoalList extends React.Component {
    //when this component first rendered, call the fetch goals to the server
    componentDidMount(){
        this.props.fetchEverydayGoals()
    }

    renderAmin(everydayGoal) {
        if(everydayGoal && everydayGoal.userId === this.props.currentUserId) {
            return (
                <div className="right floated content">
                    <Link to={`/streams/edit/${everydayGoal.id}`} className="ui button primary">
                    Edit</Link>

                    <Link to={`/streams/delete/${everydayGoal.id}`} className="ui button negative">
                        Delete
                    </Link>
                </div>
            );
        }
    }

    renderList(){
        return this.props.streams.map(everydayGoal =>{
            return (
                <div className="item" key={everydayGoal.id}>
                    {this.renderAmin(everydayGoal)}
                    <i className="large middle aligned icon camera" />
                    <div className="content">
                        <Link to={`/streams/${everydayGoal.id}`} className="header">
                            {everydayGoal.title}
                        </Link>
                        <div className="description">{everydayGoal.description}</div>
                    </div>

                </div>
            )
        })
    }

    renderCreate() {
        if(this.props.isSignedIn) {
            return (
                <div style={{ textAlign: "right"}}>
                    <Link to="/everydaygoals/new" className="ui button primary">
                        Create new everyday goal
                    </Link>
                </div>
            )
        }
    }

    render(){
        console.log(this.props.streams);
        return (
            <div>
                <h2>Everyday goals</h2>
                <div className="ui celled list">
                    {this.renderList()}
                </div>
                {this.renderCreate()}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return { 
        streams:
         Object.values(state.streams), 
         currentUserId: state.auth.userId,
         isSignedIn: state.auth.isSignedIn
    };
};

export default connect(mapStateToProps, {fetchEverydayGoals})(EverydayGoalList);