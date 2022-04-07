import React from "react";
import{ connect} from "react-redux";
import { Link } from "react-router-dom";
import {createDiary} from "../../actions"
import { DIARIES_HOME_PAGE_LINK } from "../../constants/pagesLink";
import DiariesForm from "./DiaryForm";

class DiaryCreate extends React.Component {
    onSubmit =(formValues)=> {
        this.props.createDiary(formValues);
        
    }

    render(){
        return (
            <div>
                <h3>Create a new diary</h3>
                <DiariesForm onSubmit={this.onSubmit}/>
                <br />
                <Link to={`${DIARIES_HOME_PAGE_LINK}`} className="item">
                    Go Back
                </Link>
            </div>
        )
    }
}



export default connect(null, {createDiary})(DiaryCreate);