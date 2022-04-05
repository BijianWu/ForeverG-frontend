import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {fetchDiaries} from "../../actions"
import { todayDateCreator } from "../../utils/todayDateCreator";

class DiarylList extends React.Component {
    constructor(props) {
        super(props);

        this.state={fetched:false};
    }

    //when this component first rendered, call the fetch goals to the server
    componentDidMount(){
        console.log("componentDidMount in EverydayGoalListGotcalled")
        if(!this.props.isSignedIn || this.props.isSignedIn === false) return;
        console.log("is logged in " + this.props.isSignedIn)
        this.props.fetchDiaries();
    }

    //TODO: if the goal is commited, we show commited
    renderAmin(everydayGoal) {
        //since all goals retrived here will only belong to this current user, we do not need to track who created, because only user who created it can view it
        if(everydayGoal) {
            let commitElement;

            if (everydayGoal.can_be_edited) {
                commitElement = <Link to={`/diarys/edit/${everydayGoal.id}`} className="ui button primary">Edit</Link>
            } else {
                // commitElement = <p>Committed</p>;
                commitElement = <button className="ui button positive basic wbj-active-button">None Editable</button>
            }
            return (
                <div className="right floated content">

                    {commitElement}

                    <Link to={`/diarys/delete/${everydayGoal.id}`} className="ui button negative">
                        Delete
                    </Link>
                </div>
            );
        }
    }

    renderList(){
        if(this.props.diaries.length <= 0){ return <div>No Content</div>}

        // if(this.props.streams.length <= 0) {return <div>No Content</div>}
        // this.props.fetchEverydayGoals();
        return this.props.diaries.map((diary, index) =>{
            console.log(`diary.id ${diary.id}`)
            return (
                <div className="item ui clearing segment" key={diary.id}>
                    <br/>
                    
                    <div className="ui segment">
                        <h2 className="ui left floated header">                        
                            <Link to={`/diarys/${diary.id}`} className="header">
                            <i className="large middle aligned icon bullseye" />{diary.title}
                            </Link>
                        </h2>
                        <div className="ui clearing divider"></div>
                        <div className="content">
                        {this.renderAmin(diary)}
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
                    <br />
                    <Link to="/diarys/new" className="ui button primary">
                        Create a new diary
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
        </Link> to view your diaries</div>
        }

        console.log(this.props.diaries);
        return (
            <div className="container">
                <div className="ui vertical segment">
                    <h2 className="ui icon aligned  header">
                        <i className="icon edit"></i>
                        Diaries
                    </h2>
                </div>
                {/* <h2>Everyday goals for</h2> */}
                {this.renderCreate()}
                <div className="">
                    {this.renderList()}
                </div>
                
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return { 
        diaries: Object.values(state.diaries), 
         currentUserId: state.auth.userId,
         isSignedIn: state.auth.isSignedIn
    };
};

export default connect(mapStateToProps, {fetchDiaries})(DiarylList);