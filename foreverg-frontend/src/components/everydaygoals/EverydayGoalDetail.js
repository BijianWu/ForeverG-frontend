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
        if(!this.props.everydayGoal){
            return <div>Loading...</div>
        }
        const {title, description, forever_days, updated_at, created_at, id} = this.props.everydayGoal;

        let commitElement;
        let updatedAtIsToday = false;
        let updatedAtIsYesterday = false;
        if (updated_at !== todayDateCreator()) {
            if(forever_days > 0){
                updatedAtIsYesterday = true;
                commitElement = <div><h5 className="ui orange large basic label">You have haven't commited today, commit it or you gonna lose {forever_days} days of progress</h5> <Link to={`${EVERY_DAY_GOALS_COMMIT_PAGE_LINK_PREFIX}/${id}`} className="ui button secondary">Commit</Link></div> 
            } else {
                // commitElement = <div><h5 className="ui red large basic label">You have haven't commited today, commit it now</h5><div className="ui segment"><Link to={`${EVERY_DAY_GOALS_COMMIT_PAGE_LINK_PREFIX}/${id}`} className="ui button violet">Commit</Link></div></div>

                commitElement =<div class="ui negative message">
                    <div class="header">
                    You have haven't commited today, commit it now
                    </div>
                    <div class="ui divider"></div>
                    <div><Link to={`${EVERY_DAY_GOALS_COMMIT_PAGE_LINK_PREFIX}/${id}`} className="ui button violet">Commit</Link>
                    </div>
                </div>
            }
        } else {
            updatedAtIsToday = true;
            commitElement = <h5 className="ui green large basic label">You have Committed today, good job</h5>;
        }

        let updatedAtRenderElement;
        if(updatedAtIsToday){
            updatedAtRenderElement = "Today";
        } else if( updatedAtIsYesterday) {
            updatedAtRenderElement = "Yesterday";
        } else {
            updatedAtRenderElement = updated_at;
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
                    <p>Last updated date is:</p>
                    <div className="ui raised segment">
                        <p>{updatedAtRenderElement}</p>
                    </div>
                </div>


                <div className="ui vertical padded segment">
                    <p>Commited days:</p>
                    <div className="ui raised segment">
                        <p className={`ui pointing ${forever_days > 0 ? 'green': 'red'} basic label`}>{forever_days}</p>
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
    return { everydayGoal: state.everydayGoals[ownProps.match.params.id]};
}

export default connect(mapStateToProps, {fetchEverydayGoal})(EverydayGoalDetail);