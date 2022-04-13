import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { DIARIES_HOME_PAGE_LINK, EVERY_DAY_GOALS_HOME_PAGE_LINK, FUTRUE_TASKS_HOME_PAGE_LINK, REGISTER_PAGE_LINK, SIGN_IN_PAGE_LINK } from "../constants/pagesLink";
import diaryHomePage from "./diaryHomePage.jpg";
import everydayGoalHomePage from "./everydayGoalHomePage.jpg";
import futureTaskHomePage from "./futureTaskHomePage.jpg";
import "./HomePage.css"

class HomePage extends React.Component{
    render(){
        let commitElement;
        if(this.props.isSignedIn){
            commitElement = 
            <div className=""> 
                <div>Click the View button coresponding to the action you want to take to get started</div> 
                <div className="ui divider"></div>

                <div className="ui items">
                <div className="item">
                        <div className="right floated content">
                        <Link to={`${EVERY_DAY_GOALS_HOME_PAGE_LINK}`} className="item wbj-middle-item">
                            <div className="ui primary huge basic button">View daily goals</div>
                        </Link>
                        
                        </div>
                        <img className="ui medium rounded image" src={everydayGoalHomePage}/>
                    </div>
                    
                <div className="ui divider"></div>

                    <div className="item">
                        <div className="right floated content">
                            <Link to={`${DIARIES_HOME_PAGE_LINK}`} className="item wbj-middle-item">
                            <div className="ui primary huge basic button">View diaries</div>
                            </Link>       
                        </div>
                        <img className="ui medium rounded image" src={diaryHomePage}/>
                    </div>
                    
                <div className="ui divider"></div>

                    <div className="item">
                        <div className="right floated content">
                            <Link to={`${FUTRUE_TASKS_HOME_PAGE_LINK}`} className="item wbj-middle-item">
                            <div className="ui primary huge basic button">View tasks</div>
                            </Link>
                        </div>
                        <img className="ui medium rounded image" src={futureTaskHomePage}/>
                    </div>
                </div>


                <div className="ui divider"></div>
            </div>

        } else {
            commitElement = <div>Please <Link to={`${SIGN_IN_PAGE_LINK}`} className="item">
            Log in 
        </Link> Or <Link to={`${REGISTER_PAGE_LINK}`} className="item">
            Register
        </Link> to get started</div>        
        }
        return (
            <div>
                <h1>Welcome to Forever G</h1>
                <div className="ui divider"></div>
                {commitElement}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return { 
         currentUserId: state.auth.userId,
         isSignedIn: state.auth.isSignedIn
    };
};

export default connect(mapStateToProps, {})(HomePage);