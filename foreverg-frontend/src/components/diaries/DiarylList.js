import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {fetchDiaries} from "../../actions"
import diaryImg from "./diary.jpg"

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

        return this.props.diaries.map((diary) =>{
            let content = "";
            if(diary.content && diary.content.length > 10){
                content = diary.content.substring(0,10) + " ...";
            }
            return (
                <div className="ui card" key={diary.id}>
                    <div className="image">
                        <img src={diaryImg} />
                    </div>
                    <div className="content">
                        <Link to={`/diarys/${diary.id}`} className="header">
                            {diary.title}
                        </Link>
                        <div className="meta">
                        <span className="date">Created at {diary.created_at}</span>
                        </div>
                        <div className="description">
                        {content}
                        </div>
                    </div>
                    <div className="extra content">
                        {this.renderAmin(diary)}
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
                <h2 className="ui icon aligned  header">
                    <i className="icon book"></i>
                    Diaries
                </h2>

                {/* <h2>Everyday goals for</h2> */}
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
        diaries: Object.values(state.diaries), 
         currentUserId: state.auth.userId,
         isSignedIn: state.auth.isSignedIn
    };
};

export default connect(mapStateToProps, {fetchDiaries})(DiarylList);