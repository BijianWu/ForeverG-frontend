import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchFutureTask } from "../../actions";

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

        let commitElement;

        if (true) {
            commitElement =                 <Link to={`/futuretasks/edit/${this.props.futureTask.id}`} className="item">
            Edit
        </Link>
        } else {
            commitElement = <p>None-finished future tasks, you cannot edit it anymore</p>
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
                        <p>{description}</p>
                    </div>
                </div>

                <div className="ui vertical padded segment">
                    <p>Created at:</p>
                    <div className="ui raised segment">
                        <p>{created_at}</p>
                    </div>
                </div>

                <div className="ui vertical padded segment">
                    <div className="ui raised segment">
                        {commitElement}
                    </div>
                </div>

            </div>
            {/* {commitElement} */}
            <br />
            <div>
                <Link to="/futuretasks" className="item">
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