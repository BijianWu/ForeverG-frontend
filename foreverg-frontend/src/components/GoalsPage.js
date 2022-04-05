import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

//not being used yet
class GoalsPage extends React.Component{

    render(){
        let commitElement;
        if(this.props.isSignedIn){
            commitElement = <div> Welcome back, now you can view the <Link to="/goals" className="item">
            Goals 
        </Link></div>
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
                <p>In here you can track your goal progress</p>
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

export default connect(mapStateToProps, {})(GoalsPage);