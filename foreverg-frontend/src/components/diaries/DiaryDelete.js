import React from "react";
import history from "../../history";
import Modal from "../Modal";
import {connect} from "react-redux";
import {fetchDiary, deleteDiary} from "../../actions"
import { Link } from "react-router-dom";
import { DIARIES_HOME_PAGE_LINK } from "../../constants/pagesLink";

class DiaryDelete extends React.Component {
    renderActions (){
        return (
            <React.Fragment>
                <button onClick={() => this.props.deleteDiary(this.props.match.params.id)} className="ui button negative">Delete</button>
                <Link to={`${DIARIES_HOME_PAGE_LINK}`}  className="ui button">Cancel</Link>
            </React.Fragment>
        );
    }
    componentDidMount(){
        this.props.fetchDiary(this.props.match.params.id);
    }

    renderContent() {
        if(!this.props.diary) {
            return "Are you sure you want to delete this diary?";
        }

        return `Are you sure you want to delete the diary with title: ${this.props.diary.title}`;
    }

    render(){
        return (
            <Modal title="Delete Diary" content={this.renderContent()} actions={this.renderActions()} onDismiss={()=>history.push(`${DIARIES_HOME_PAGE_LINK}`)}/>
        );
    }

};

const mapStateToProps = (state, ownProps) => {
    return {diary: state.diaries[ownProps.match.params.id]}
};

export default connect(mapStateToProps, {fetchDiary, deleteDiary})(DiaryDelete);