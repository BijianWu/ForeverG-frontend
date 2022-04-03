import React from "react";
import { connect } from "react-redux";
import { signIn, signOut, clearEverydayGoals } from "../actions"
import goals from "../apis/goals";
import {fetchEverydayGoals} from "../actions/index"
import history from "../history";
import { parseJwt } from "../utils/jsonParser";

class DjangoAuth extends React.Component{
    constructor(props) {
        super(props);

        this.state={token:"", username:"", password:""};
    }

    componentDidMount(){
        //get local stored token, if it is null, then we log in and fetch for it again
        if (typeof(Storage) !== "undefined") {
            // Code for localStorage/sessionStorage.
            if(localStorage.getItem("FOREVER_G_TOKEN")){
                console.log("FOREVER_G_TOKEN been set " + localStorage.getItem("FOREVER_G_TOKEN"));
                const getParsedData = parseJwt(localStorage.getItem("FOREVER_G_TOKEN"));
                this.props.signIn(getParsedData.user_id, localStorage.getItem("FOREVER_G_TOKEN"));
                this.setState({token: localStorage.getItem("FOREVER_G_TOKEN")})     
                this.props.fetchEverydayGoals(); 
            } else {
                //Not logged in
            }
          } else {
            // Sorry! No Web Storage support..
            //Not logged in, and cannot access the localStorage as it is not supported
          }
    }

    
    onSignInClick = async () => {
        history.push("/signin")
    }

    onSignOutClick = () => {
        if (typeof(Storage) !== "undefined") {
            localStorage.removeItem("FOREVER_G_TOKEN");   
        }
        this.props.clearEverydayGoals();
        this.props.signOut();
        this.setState({token: "", username: "", password: ""}); 
        history.push("/");
        // this.auth.signOut();
    }

    renderAuthButton() {
        if(this.props.isSignedIn){
            return (
                <button className="ui red google button" onClick={()=>{this.onSignOutClick()}}>
                    <i className="google icon" />
                    Sign Out
                </button>
            )
        }
        else{
            return (
                <button className="ui red google button" onClick={()=>{this.onSignInClick()}}>
                    <i className="google icon" />
                    Sign in
                </button>
            )
        }
    }

    render(){
        return (
           this.renderAuthButton()
        )
    }
}

const mapStateToProps = (state) => {
    return {isSignedIn: state.auth.isSignedIn}
};

export default connect(mapStateToProps, {signIn, signOut, fetchEverydayGoals, clearEverydayGoals})(DjangoAuth);