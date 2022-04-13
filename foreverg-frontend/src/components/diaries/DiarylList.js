import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {fetchDiaries} from "../../actions"
import { DIARIES_DELETE_PAGE_LINK_PREFIX, DIARIES_DETAIL_PAGE_LINK_PREFIX, DIARIES_EDIT_PAGE_LINK_PREFIX, DIARIES_NEW_PAGE_LINK, SIGN_IN_PAGE_LINK } from "../../constants/pagesLink";
import diaryImg from "./diary.jpg"

class DiarylList extends React.Component {
    constructor(props) {
        super(props);

        this.state={fetched:false};
    }

    //when this component first rendered, call the fetch goals to the server
    componentDidMount(){
        if(!this.props.isSignedIn || this.props.isSignedIn === false) return;

        this.props.fetchDiaries();
    }

    //TODO: if the goal is commited, we show commited
    renderAmin(diary) {
        //since all goals retrived here will only belong to this current user, we do not need to track who created, because only user who created it can view it
        if(diary) {
            let commitElement;

            if (diary.can_be_edited) {
                commitElement = <Link to={`${DIARIES_EDIT_PAGE_LINK_PREFIX}/${diary.id}`} className="ui button primary">Edit</Link>
            } else {
                // commitElement = <p>Committed</p>;
                // commitElement = <button className="ui button positive basic wbj-active-button">None Editable</button>
                commitElement = <Link to={`${DIARIES_DETAIL_PAGE_LINK_PREFIX}/${diary.id}`} className="ui button">View</Link>
            }
            return (
                <div className="right floated content">

                    {commitElement}

                    <Link to={`${DIARIES_DELETE_PAGE_LINK_PREFIX}/${diary.id}`} className="ui button negative">
                        Delete
                    </Link>
                </div>
            );
        }
    }

    renderList(){
        if(this.props.diaries.length <= 0){ return <div>No Content</div>}

        return this.props.diaries.map((diary) =>{
            let content = "";
            if(diary.content){
                content = diary.content;
                if(diary.content.length > 10) {
                    content = diary.content.substring(0,10) + " ...";
                }
            }
            let statusElement = <div className="ui blue ribbon label">
            <i className="edit icon"></i> Can be edited
            </div>
        if(!diary.can_be_edited){
            statusElement = <div className="ui gray ribbon label">
            <i className="eye icon"></i> View Only
            </div>
        }
            return (
                <div className="ui container image card" key={diary.id}>

                    <div className="image">
                        <img src={diaryImg} />
                    </div>
                    {statusElement}
                    <div className="content">
                        <Link to={`${DIARIES_DETAIL_PAGE_LINK_PREFIX}/${diary.id}`} className="ui header button">
                            {diary.title}
                        </Link>
                        <div className="meta">
                        <span className="date">Created at {diary.created_at}</span>
                        </div>
                        <div className="description">
                        {diary.content ? content: 'No content'}
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
                    <Link to={`${DIARIES_NEW_PAGE_LINK}`} className="ui button primary">
                        Create a new diary
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
        </Link> to view your diaries</div>
        }

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