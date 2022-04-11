import React, {createRef} from "react";
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

        this.firstLinkTabRef = createRef();
        this.firstTabContentRef = createRef();

        this.secondLinkTabRef = createRef();
        this.secondTabContentRef = createRef();

        this.thirdLinkTabRef = createRef();
        this.thirdTabContentRef = createRef();
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

    renderCommitedList() {

    }

    renderTodosList() {

    }

    renderList(onlyShowCommitedGoals, onlyShowTodoGoals){
        if(this.props.everydayGoals.length <= 0){ return <div>No Content</div>}

        let filteredOne = this.props.everydayGoals.slice();
        if(onlyShowCommitedGoals){
            filteredOne = this.props.everydayGoals.filter(goal => goal.updated_at && goal.updated_at === todayDateCreator());
        } else if(onlyShowTodoGoals){
            filteredOne = this.props.everydayGoals.filter(goal => !goal.updated_at || (goal.updated_at && goal.updated_at !== todayDateCreator()))
        }

        return filteredOne.map((everydayGoal, index) =>{
            let description = "";
            if(everydayGoal.description){
                description = everydayGoal.description;
                if(everydayGoal.description.length > 10){
                    description = everydayGoal.description.substring(0,10) + " ...";
                }
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
                            {everydayGoal.description ? description: 'No description'}
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

    onFirstTapClicked = () => {
        if(this.firstLinkTabRef && this.firstLinkTabRef.current){
            if(!this.firstLinkTabRef.current.classList.contains("active")){
                this.firstLinkTabRef.current.classList.add("active");
                this.firstTabContentRef.current.classList.add("active");
            }

            if(this.secondLinkTabRef.current.classList.contains("active")){
                this.secondLinkTabRef.current.classList.remove("active");
                this.secondTabContentRef.current.classList.remove("active");
            }

            if(this.thirdLinkTabRef.current.classList.contains("active")){
                this.thirdLinkTabRef.current.classList.remove("active");
                this.thirdTabContentRef.current.classList.remove("active");
            }
        }
    }

    onSecondTapClicked = () => {
        if(this.secondLinkTabRef && this.secondLinkTabRef.current){
            if(this.firstLinkTabRef.current.classList.contains("active")){
                this.firstLinkTabRef.current.classList.remove("active");
                this.firstTabContentRef.current.classList.remove("active");
            }

            if(!this.secondLinkTabRef.current.classList.contains("active")){
                this.secondLinkTabRef.current.classList.add("active");
                this.secondTabContentRef.current.classList.add("active");
            }

            if(this.thirdLinkTabRef.current.classList.contains("active")){
                this.thirdLinkTabRef.current.classList.remove("active");
                this.thirdTabContentRef.current.classList.remove("active");
            }
        }
    }

    onThirdTapClicked = () => {
        if(this.thirdLinkTabRef && this.thirdLinkTabRef.current){
            if(this.firstLinkTabRef.current.classList.contains("active")){
                this.firstLinkTabRef.current.classList.remove("active");
                this.firstTabContentRef.current.classList.remove("active");
            }

            if(this.secondLinkTabRef.current.classList.contains("active")){
                this.secondLinkTabRef.current.classList.remove("active");
                this.secondTabContentRef.current.classList.remove("active");
            }

            if(!this.thirdLinkTabRef.current.classList.contains("active")){
                this.thirdLinkTabRef.current.classList.add("active");
                this.thirdTabContentRef.current.classList.add("active");
            }
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
                        {this.renderCreate()}
                    </div>

                <div className="ui top attached tabular menu">
                    <a ref={this.firstLinkTabRef} className="active item" data-tab="first" onClick={() => this.onFirstTapClicked()}>All</a>
                    <a ref={this.secondLinkTabRef} className="item" data-tab="second" onClick={() => this.onSecondTapClicked()}>Committed</a>
                    <a ref={this.thirdLinkTabRef} className="item" data-tab="third" onClick={() => this.onThirdTapClicked()}>Todo</a>
                </div>
                
                <div ref={this.firstTabContentRef} className="ui bottom attached active tab segment" data-tab="first">
                    <div className="ui cards centered">
                        {this.renderList(false, false)}
                    </div>
                </div>

                <div ref={this.secondTabContentRef} className="ui bottom attached tab segment" data-tab="second">
                    {this.renderList(true, false)}
                </div>

                <div ref={this.thirdTabContentRef} className="ui bottom attached tab segment" data-tab="third">
                    {this.renderList(false, true)}
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