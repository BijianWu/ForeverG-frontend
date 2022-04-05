import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import diaryHomePage from "./diaryHomePage.jpg";
import everydayGoalHomePage from "./everydayGoalHomePage.jpg";
import futureTaskHomePage from "./futureTaskHomePage.jpg";
import "./HomePage.css"

class HomePage extends React.Component{
    render(){
        let commitElement;
        if(this.props.isSignedIn){
            commitElement = 
            <div> 
                <div>Welcome back, now you can view the following</div> 
                <div className="ui divider"></div>
                <p></p>

                <p></p>

                <div className="ui middle aligned divided list">
                    <div className="item">
                        <div className="right floated content">
                        <Link to="/goals" className="item wbj-middle-item">
                            <div className="ui primary huge basic button">View</div>
                        </Link>
                        
                        </div>
                        <img className="ui medium rounded image" src={everydayGoalHomePage}/>
                        <div className="content">
                        Everyday goals
                        </div>
                    </div>
                    <div className="item">
                        <div className="right floated content">
                        <Link to="/diarys" className="item wbj-middle-item">
                        <div className="ui primary huge basic button">View</div>
                        </Link>
                        
                        </div>
                        <img className="ui medium rounded image" src={diaryHomePage}/>
                        <div className="content">
                        Diaries
                        </div>
                    </div>
                    <div className="item">
                        <div className="right floated content">
                        <Link to="/futuretasks" className="item wbj-middle-item">
                        <div className="ui primary huge basic button">View</div>
                        </Link>

                        </div>
                        <img className="ui medium rounded image" src={futureTaskHomePage}/>
                        <div className="content">
                        Future Tasks
                        </div>
                    </div>
                </div>

                <div className="ui divider"></div>
            </div>

        } else {
            commitElement = <div>Please <Link to="/signin" className="item">
            Log in 
        </Link> Or <Link to="/register" className="item">
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