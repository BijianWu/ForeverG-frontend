import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchEverydayGoal } from "../../actions";
import { EVERY_DAY_GOALS_COMMIT_PAGE_LINK_PREFIX, EVERY_DAY_GOALS_HOME_PAGE_LINK } from "../../constants/pagesLink";
import { todayDateCreator } from "../../utils/todayDateCreator";

class EverydayGoalDetail extends React.Component {
    constructor(props){
        super(props);

        this.videoRef = React.createRef();
    }

    componentDidMount() {
        const { id } = this.props.match.params;
        this.props.fetchEverydayGoal(id);
    }

    render() {
        if(!this.props.stream){
            return <div>Loading...</div>
        }
        const {title, description, forever_days, updated_at, created_at, id} = this.props.stream;

        let commitElement;

        if (updated_at !== todayDateCreator()) {
            if(forever_days > 0){
                commitElement = <div><h5>You have haven't commited today, commit it or you gonna lose {forever_days} days of progress</h5> <Link to={`${EVERY_DAY_GOALS_COMMIT_PAGE_LINK_PREFIX}/${id}`} className="ui button secondary">Commit</Link></div> 
            } else {
                commitElement = <div><h5>You have haven't commited today, commit it now</h5><Link to={`${EVERY_DAY_GOALS_COMMIT_PAGE_LINK_PREFIX}/${id}`} className="ui button secondary">Commit</Link></div>
            }
        } else {
            commitElement = <h5>You have Committed today, good job</h5>;
        }
        return (
            <React.Fragment>
            <div className="container">
                <div className="ui vertical segment">
                    <h2 className="ui icon aligned  header">
                        <i className="icon bullseye"></i>
                        Goal Title: {title}
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
                    <p>Last updated at:</p>
                    <div className="ui raised segment">
                        <p>{updated_at}</p>
                    </div>
                </div>


                <div className="ui vertical padded segment">
                    <p>Commited days:</p>
                    <div className="ui raised segment">
                        <p>{forever_days}</p>
                    </div>
                </div>


                <div className="ui vertical padded segment">
                    <p>Commited today status:</p>
                    <div className="ui raised segment">
                        {commitElement}
                    </div>
                </div>


            </div>
            <br />
            <div>
                <Link to={`${EVERY_DAY_GOALS_HOME_PAGE_LINK}`} className="item">
                    Go Back
                </Link>
                <br/><br/>
            </div>

            </React.Fragment>
           
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return { stream: state.streams[ownProps.match.params.id]};
}

export default connect(mapStateToProps, {fetchEverydayGoal})(EverydayGoalDetail);