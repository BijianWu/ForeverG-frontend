import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {fetchEverydayGoals} from "../../actions"
import { EVERY_DAY_GOALS_COMMIT_PAGE_LINK_PREFIX, EVERY_DAY_GOALS_DELETE_PAGE_LINK_PREFIX, EVERY_DAY_GOALS_DETAIL_PAGE_LINK_PREFIX, EVERY_DAY_GOALS_EDIT_PAGE_LINK_PREFIX, EVERY_DAY_GOALS_NEW_PAGE_LINK, SIGN_IN_PAGE_LINK } from "../../constants/pagesLink";
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
                commitElement = <Link to={`${EVERY_DAY_GOALS_COMMIT_PAGE_LINK_PREFIX}/${everydayGoal.id}`} className="ui button yellow basic">Commit it~</Link>
            } else {
                // commitElement = <p>Committed</p>;
                commitElement = <button className="ui button positive basic wbj-active-button">Committed</button>
            }
            return (//change the cards to card will position it differently
                <div className="ui cards centered">
                    
                    {commitElement}
                    <Link to={`${EVERY_DAY_GOALS_EDIT_PAGE_LINK_PREFIX}/${everydayGoal.id}`} className="ui button primary">
                    Edit</Link>

                    <Link to={`${EVERY_DAY_GOALS_DELETE_PAGE_LINK_PREFIX}/${everydayGoal.id}`} className="ui button negative">
                        Delete
                    </Link>
                </div>
            );
        }
    }

    renderList(){
        if(this.props.everydayGoals.length <= 0){ return <div>No Content</div>}

        return this.props.everydayGoals.map((everydayGoal, index) =>{
            let description = "";
            if(everydayGoal.description && everydayGoal.description.length > 10){
                description = everydayGoal.description.substring(0,10) + " ...";
            }

            return (
                <div className="card ui clearing segment" key={everydayGoal.id}>
                    <br/>
                    
                    <div className="ui segment">
                        <h2 className="ui centered header">                        
                            <Link to={`${EVERY_DAY_GOALS_DETAIL_PAGE_LINK_PREFIX}/${everydayGoal.id}`} className="header">
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

                    <Link to={`${EVERY_DAY_GOALS_NEW_PAGE_LINK}`} className="ui button primary">
                        Create new everyday goal
                    </Link>
                    <br /><br />
                </div>
            )
        }
    }

    render(){
        if(!this.props.isSignedIn || this.props.isSignedIn === false){
            return <div>Please  <Link to={`${SIGN_IN_PAGE_LINK}`}>
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
        everydayGoals: Object.values(state.everydayGoals), 
        currentUserId: state.auth.userId,
        isSignedIn: state.auth.isSignedIn
    };
};

export default connect(mapStateToProps, {fetchEverydayGoals})(EverydayGoalList);