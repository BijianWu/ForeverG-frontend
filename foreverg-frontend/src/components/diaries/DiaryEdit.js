import React from "react";
import { connect } from "react-redux";
import { fetchDiary, editDiary } from "../../actions";
import _ from "lodash";
import { Link } from "react-router-dom";
import DiariesForm from "./DiaryForm";
import { DIARIES_HOME_PAGE_LINK } from "../../constants/pagesLink";

class DiaryEdit extends React.Component {
    componentDidMount() {
        this.props.fetchDiary(this.props.match.params.id);
    }

    onSubmit =(formValues) => {
        this.props.editDiary(this.props.match.params.id, formValues);
    }

    render() {
        if(!this.props.diary){
            return <div>Loading..</div>
        }
        return (
            <div>
                <h3>Edit the diary: {this.props.diary.title}</h3>
                <p>Created at: {this.props.diary.created_at}</p>
                <DiariesForm initialValues={_.pick(this.props.diary, "title", "content")} onSubmit={this.onSubmit}/>
                <br />
                <Link to={`${DIARIES_HOME_PAGE_LINK}`} className="item">
                    Go Back
                </Link>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {diary: state.diaries[ownProps.match.params.id]};
}

export default connect(mapStateToProps, {fetchDiary, editDiary})(DiaryEdit);