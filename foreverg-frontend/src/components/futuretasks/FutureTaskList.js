import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {fetchFutureTasks} from "../../actions"
import { isPassedDeadlineDate, todayDateCreator } from "../../utils/todayDateCreator";

class FutureTaskList extends React.Component {
    constructor(props) {
        super(props);

        this.state={fetched:false};
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
                    commitElement = <Link to={`/futuretasks/edit/${futureTask.id}`} className="ui button primary">Edit</Link>
                } else {
                    // commitElement = <p>Committed</p>;
                    commitElement = <button className="ui button red basic wbj-active-button">Failed</button>
                }
            }

            return (
                <div className="right floated content">

                    {commitElement}

                    <Link to={`/futuretasks/delete/${futureTask.id}`} className="ui button negative">
                        Delete
                    </Link>
                </div>
            );
        }
    }

    renderList(){
        if(this.props.futureTasks.length <= 0){ return <div>No Content</div>}

        return this.props.futureTasks.map((futureTask) =>{
            let description = "";
            if(futureTask.description && futureTask.description.length > 10){
                description = futureTask.description.substring(0,10) + " ...";
            }

            return (
                <div className="ui card" key={futureTask.id}>
                    <div className="image">
                        <img src="" />
                    </div>
                    <div className="content">
                        <Link to={`/futuretasks/${futureTask.id}`} className={`header`}>
                            {futureTask.title}
                        </Link>
                        <div className="meta">
                        <span className="date">Created at {futureTask.created_at}</span>
                        </div>
                        <div className="description">
                        {description}
                        </div>
                    </div>
                    <div className="extra content">
                        {this.renderAmin(futureTask)}
                    </div>
                </div>
            )
        })
    }

    renderCreate() {
        if(this.props.isSignedIn) {
            return (
                <div style={{ textAlign: "center"}}>
                    <br />
                    <Link to="/futuretasks/new" className="ui button primary">
                        Create a new future task
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
        </Link> to view your future tasks</div>
        }

        console.log(this.props.diaries);
        return (
            <div className="container">
                <h2 className="ui icon aligned  header">
                    <i className="icon globe"></i>
                    Future tasks
                </h2>

                {this.renderCreate()}
                <div className="ui cards">
                    {this.renderList()}
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