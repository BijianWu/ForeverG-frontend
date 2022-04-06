import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {fetchEverydayGoals} from "../../actions"
import { todayDateCreator } from "../../utils/todayDateCreator";
import "./EverydayGoalList.css";

class EverydayGoalList extends React.Component {
    constructor(props) {
        super(props);

        this.state={fetched:false};
    }

    //when this component first rendered, call the fetch goals to the server
    componentDidMount(){
        if(!this.props.isSignedIn || this.props.isSignedIn === false) return;
        this.props.fetchEverydayGoals();
    }

    //TODO: if the goal is commited, we show commited
    renderAmin(everydayGoal) {
        //since all goals retrived here will only belong to this current user, we do not need to track who created, because only user who created it can view it
        if(everydayGoal) {
            let commitElement;

            if (everydayGoal.updated_at !== todayDateCreator()) {
                commitElement = <Link to={`/goals/everydaygoals/commit/${everydayGoal.id}`} className="ui button yellow basic">Commit it~</Link>
            } else {
                // commitElement = <p>Committed</p>;
                commitElement = <button className="ui button positive basic wbj-active-button">Committed</button>
            }
            return (//change the cards to card will position it differently
                <div className="ui cards centered">
                    
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
        return this.props.streams.map((everydayGoal, index) =>{
            let description = "";
            if(everydayGoal.description && everydayGoal.description.length > 10){
                description = everydayGoal.description.substring(0,10) + " ...";
            }

            return (
                <div className="card ui clearing segment" key={everydayGoal.id}>
                    <br/>
                    
                    <div className="ui segment">
                        <h2 className="ui centered header">                        
                            <Link to={`/goals/everydaygoals/${everydayGoal.id}`} className="header">
                            <i className="large middle aligned icon bullseye" />{everydayGoal.title}
                            </Link>
                        </h2>
                        <p className="ui centered ">                        
                            {description.length > 0 ? description: 'No description'}
                        </p>

                        <div className="ui clearing divider"></div>
                        <div className="content">
                            {this.renderAmin(everydayGoal)}
                        </div>
                    </div>

                    <br/>
                </div>
            )
        })
    }

    renderCreate() {
        if(this.props.isSignedIn) {
            return (
                <div style={{ textAlign: "center"}}>

                    <Link to="/goals/everydaygoals/new" className="ui button primary">
                        Create new everyday goal
                    </Link>
                    <br /><br />
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

        return (
            <div className="container">
                <div className="ui vertical segment">
                    <h2 className="ui icon aligned  header">
                        <i className="icon edit"></i>
                        Everyday goals
                    </h2>
                </div>
                {/* <h2>Everyday goals for</h2> */}
                {this.renderCreate()}
                <div className="ui cards centered">
                    {this.renderList()}
                </div>
                
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