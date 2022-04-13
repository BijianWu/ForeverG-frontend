import React, { createRef } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {fetchFutureTasks} from "../../actions"
import { FUTRUE_TASKS_DELETE_PAGE_LINK_PREFIX, FUTRUE_TASKS_DETAIL_PAGE_LINK_PREFIX, FUTRUE_TASKS_EDIT_PAGE_LINK_PREFIX, FUTRUE_TASKS_NEW_PAGE_LINK, SIGN_IN_PAGE_LINK } from "../../constants/pagesLink";
import { MAX_FUTURE_TASKS } from "../../myConfig";
import { isPassedDeadlineDate, todayDateCreator } from "../../utils/todayDateCreator";
import taskTargetImg from "./taskTarget.jpg";
class FutureTaskList extends React.Component {
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

        this.props.fetchFutureTasks();
        
    }

    //TODO: if the goal is commited, we show commited
    renderAmin(futureTask) {
        //since all goals retrived here will only belong to this current user, we do not need to track who created, because only user who created it can view it
        if(futureTask) {
            let commitElement;

            //Not a correct way, we should do a calculation here to see which day is bigger
            //if finished_at is smaller than today or if finished_at is null and deadline_date is greater than today

            if(futureTask.finished_at){
                commitElement = <button className="ui button green basic wbj-active-button">Completed</button>
            } else{
                if (isPassedDeadlineDate(futureTask.deadline_date) === false) {
                    commitElement = <Link to={`${FUTRUE_TASKS_EDIT_PAGE_LINK_PREFIX}/${futureTask.id}`} className="ui button primary">Edit</Link>
                } else {
                    // commitElement = <p>Committed</p>;
                    commitElement = <button className="ui button red basic wbj-active-button">Failed</button>
                }
            }

            return commitElement
        }
    }

    renderList(onlyShowCommitedTasks, onlyShowUnfinishedTasks){
        if(this.props.futureTasks.length <= 0){ return <div>No Content</div>}

        
        let filteredOne = this.props.futureTasks.slice();
        if(onlyShowCommitedTasks){
            filteredOne = this.props.futureTasks.filter(task => task.finished_at);
        } else if(onlyShowUnfinishedTasks){
            filteredOne = this.props.futureTasks.filter(task => !task.finished_at)
        }

        return filteredOne.map((futureTask) =>{
            let description = "";
            if(futureTask.description){
                description = futureTask.description;
                if(futureTask.description.length > 10){
                    description = futureTask.description.substring(0,10) + " ...";
                }
            }

            let statusRibbon; 
            if(futureTask.finished_at){
                statusRibbon = <a className="ui green right ribbon label">Completed</a>
            } else{
                if (isPassedDeadlineDate(futureTask.deadline_date) === false) {
                    statusRibbon = <a className="ui gray right ribbon label">Unfinished</a>
                } else {
                    statusRibbon = <a className="ui red right ribbon label">Failed</a>
                }
            }
            return (
            <div className="ui card" key={futureTask.id} data-html="<div class='header'>User Rating</div><div class='content'><div class='ui star rating'><i class='active icon'></i><i class='active icon'></i><i class='active icon'></i><i class='active icon'></i><i class='active icon'></i></div></div>">
                <div className="ui image ">
                    {statusRibbon}
                    <img src={taskTargetImg}/>
                </div>
                
                <div className="content">
                    <div className="header"><Link to={`${FUTRUE_TASKS_DETAIL_PAGE_LINK_PREFIX}/${futureTask.id}`} className={`header`}>
                              {futureTask.title}
                          </Link></div>
                    <div className="description">
                    {futureTask.description ? description: 'No description'}
                    </div>
                </div>
                <div className="ui two bottom attached buttons">
                    {this.renderAmin(futureTask)}
                    <Link to={`${FUTRUE_TASKS_DELETE_PAGE_LINK_PREFIX}/${futureTask.id}`} className="ui button negative">
                        Delete
                    </Link>
                </div>
            </div>
            )
        })
    }

    renderCreate() {
        if(this.props.isSignedIn) {
            let elementsToRender;
            let renderCreateEverydayGoal = true;
            if(this.props.futureTasks.length >= MAX_FUTURE_TASKS){
                renderCreateEverydayGoal = false;
                elementsToRender = <div className="ui inverted segment">
                                <h4 className="ui red inverted header">Max tasks limit {MAX_FUTURE_TASKS} reached</h4>
                </div>

            } else {
                elementsToRender = <h3 className="ui block header">
                <span className="ui grey massive circular label">{this.props.futureTasks.length}</span> out of {MAX_FUTURE_TASKS} goals have been created
                </h3>
            }
            return (
                <div style={{ textAlign: "center"}}>
                    <br />
                    {elementsToRender}
                    {renderCreateEverydayGoal &&                    <Link to={`${FUTRUE_TASKS_NEW_PAGE_LINK}`} className="ui button primary">
                        Create a new future task
                    </Link>}
 
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
        </Link> to view your future tasks</div>
        }

        return (
            <div className="container">
                <h2 className="ui icon aligned  header">
                    <i className="icon globe"></i>
                    Future tasks
                </h2>

                {this.renderCreate()}

                <div className="ui top attached tabular menu">
                    <a ref={this.firstLinkTabRef} className="active item" data-tab="first" onClick={() => this.onFirstTapClicked()}>All</a>
                    <a ref={this.secondLinkTabRef} className="item" data-tab="second" onClick={() => this.onSecondTapClicked()}>Completed</a>
                    <a ref={this.thirdLinkTabRef} className="item" data-tab="third" onClick={() => this.onThirdTapClicked()}>Unfinished</a>
                </div>
                
                <div ref={this.firstTabContentRef} className="ui bottom attached active tab segment" data-tab="first">
                    <div className="ui cards centered">
                        {this.renderList(false, false)}
                    </div>
                </div>

                <div ref={this.secondTabContentRef} className="ui bottom attached tab segment" data-tab="second">
                    <div className="ui cards centered">
                        {this.renderList(true, false)}
                    </div>
                </div>

                <div ref={this.thirdTabContentRef} className="ui bottom attached tab segment" data-tab="third">
                    <div className="ui cards centered">
                        {this.renderList(false, true)}
                    </div>
                </div>

            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return { 
        futureTasks: Object.values(state.futureTasks), 
        currentUserId: state.auth.userId,
        isSignedIn: state.auth.isSignedIn
    };
};

export default connect(mapStateToProps, {fetchFutureTasks})(FutureTaskList);