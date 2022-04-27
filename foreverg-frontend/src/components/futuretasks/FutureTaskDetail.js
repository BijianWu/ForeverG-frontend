import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchFutureTask } from "../../actions";
import { FUTRUE_TASKS_COMPLETE_PAGE_LINK_PREFIX, FUTRUE_TASKS_EDIT_PAGE_LINK_PREFIX, FUTRUE_TASKS_HOME_PAGE_LINK } from "../../constants/pagesLink";
import { isPassedDeadlineDate } from "../../utils/todayDateCreator";

class FutureTaskDetail extends React.Component {
    constructor(props){
        super(props);
    }

    componentDidMount() {
        const { id } = this.props.match.params;
        this.props.fetchFutureTask(id);
    }

    render() {
        if(!this.props.futureTask){
            return <div>Loading...</div>
        }
        const {title, description, created_at, deadline_date, finished_at, left_days} = this.props.futureTask;
        
        let statusElement;

        if (false === isPassedDeadlineDate(deadline_date)) {
            if(left_days === 0){
                statusElement = <div >
                    {/* <p>Status :</p> */}
                    <div className="ui raised segment">
                        <p className="ui green horizontal label">Completed the task</p>
                    </div>
                </div>
            } else {
                statusElement = <div>
                    <div className="ui buttons">
                    <Link to={`${FUTRUE_TASKS_COMPLETE_PAGE_LINK_PREFIX}/${this.props.futureTask.id}`} className="item">
                        <button className="ui positive button"> Complete it now</button>
                    </Link>

                    <div className="or"></div>
                    <Link to={`${FUTRUE_TASKS_EDIT_PAGE_LINK_PREFIX}/${this.props.futureTask.id}`} className="item">
                        <button className="ui button">Edit</button>
                    </Link> 
                    
                    </div>
                  
                </div> 
            }
        } else {
            statusElement = <p className="ui red horizontal label">None-finished future tasks, you cannot edit it anymore</p>
        }
        return (
            <React.Fragment>
            <div className="container">
                <div className="ui vertical segment">
                    <h2 className="ui icon aligned  header">
                        <i className="icon bullseye"></i>
                        Future Task Title: {title}
                    </h2>
                </div>
                
                <div className="ui vertical padded segment">
                    <p>Description:</p>
                    <div className="ui raised segment">
                        <p>{!description || description.length <= 0 ? 'No description' : description}</p>
                    </div>
                </div>

                <div className="ui vertical padded segment">
                    <p>Created at:</p>
                    <div className="ui raised segment">
                        <p>{created_at}</p>
                    </div>
                </div>

                <div className="ui vertical padded segment">
                    <p>Deadline date is :</p>
                    <div className="ui raised segment">
                        <p>{deadline_date}</p>
                    </div>
                </div>
                {left_days > 0 && 
                <div className="ui vertical padded segment">
                    <p>Days left: </p>
                    <div className="ui raised segment">
                        <p>{left_days}</p>
                    </div>
                </div>}

                {left_days === 0 && 
                <div className="ui vertical padded segment">
                    <p>Completed at: </p>
                    <div className="ui raised segment">
                        <p>{finished_at}</p>
                    </div>
                </div>}

                <div className="ui vertical padded segment">
                    {/* <p>Actions: </p> */}
                    <div className="ui raised segment">
                        {statusElement}
                    </div>
                </div>

            </div>
            {/* {commitElement} */}
            <br />
            <div>
                <Link to={`${FUTRUE_TASKS_HOME_PAGE_LINK}`} className="item">
                    Go Back
                </Link>
                <br/><br/>
            </div>

            </React.Fragment>
           
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return { futureTask: state.futureTasks[ownProps.match.params.id]};
}

export default connect(mapStateToProps, {fetchFutureTask})(FutureTaskDetail);