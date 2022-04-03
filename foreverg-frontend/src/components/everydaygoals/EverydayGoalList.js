import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {fetchEverydayGoals} from "../../actions"
import { todayDateCreator } from "../../utils/todayDateCreator";

class EverydayGoalList extends React.Component {
    constructor(props) {
        super(props);

        this.state={fetched:false};
    }

    //when this component first rendered, call the fetch goals to the server
    componentDidMount(){
        console.log("componentDidMount in EverydayGoalListGotcalled")
        if(!this.props.isSignedIn || this.props.isSignedIn === false) return;
        console.log("is logged in " + this.props.isSignedIn)
        this.props.fetchEverydayGoals();
    }

    // componentDidUpdate() {
    //     if(this.state.fetched === true || this.props.stream){ return;}
    //     if(!this.props.isSignedIn || this.props.isSignedIn === false) return;
    //     this.setState({fetched: true});  
    //     console.log("reached here");
    //     // this.streams = true;
    //     this.props.fetchEverydayGoals();
    // }

    //TODO: if the goal is commited, we show commited
    renderAmin(everydayGoal) {
        //since all goals retrived here will only belong to this current user, we do not need to track who created, because only user who created it can view it
        if(everydayGoal) {
            let commitElement;

            if (everydayGoal.updated_at !== todayDateCreator()) {
                console.log("full todayt is " + todayDateCreator() + ", " +everydayGoal.updated_at)
                commitElement = <Link to={`/goals/everydaygoals/commit/${everydayGoal.id}`} className="ui button secondary">Commit</Link>
            } else {
                commitElement = <p>Committed</p>;
            }
            return (
                <div className="right floated content">

                    {commitElement}
                    <Link to={`/goals/everydaygoals/edit/${everydayGoal.id}`} className="ui button primary">
                    Edit</Link>

                    <Link to={`/goals/everydaygoals/delete/${everydayGoal.id}`} className="ui button negative">
                        Delete
                    </Link>
                </div>
            );
        }
    }

    renderList(){
        if(this.props.streams.length <= 0){ return <div>No Content</div>}

        // if(this.props.streams.length <= 0) {return <div>No Content</div>}
        // this.props.fetchEverydayGoals();
        return this.props.streams.map(everydayGoal =>{
            console.log(`everydayGoal.id ${everydayGoal.id}`)
            return (
                <div className="item" key={everydayGoal.id}>
                    {this.renderAmin(everydayGoal)}
                    <i className="large middle aligned icon camera" />
                    <div className="content">
                        <Link to={`/goals/everydaygoals/${everydayGoal.id}`} className="header">
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
                    <Link to="/goals/everydaygoals/new" className="ui button primary">
                        Create new everyday goal
                    </Link>
                </div>
            )
        }
    }

    render(){
        if(!this.props.isSignedIn || this.props.isSignedIn === false){
            return <div>Please  <Link to="/signin">
            Log In
        </Link> to view your everyday goals</div>
        }
        console.log(this.props.streams);
        return (
            <div>
                <h2>Everyday goals for</h2>
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
        streams: Object.values(state.streams), 
         currentUserId: state.auth.userId,
         isSignedIn: state.auth.isSignedIn
    };
};

export default connect(mapStateToProps, {fetchEverydayGoals})(EverydayGoalList);