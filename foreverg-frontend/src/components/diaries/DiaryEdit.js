import React from "react";
import { connect } from "react-redux";
import { fetchDiary, editDiary } from "../../actions";
import _ from "lodash";
import { Link } from "react-router-dom";
import DiariesForm from "./DiaryForm";

class DiaryEdit extends React.Component {
    componentDidMount() {
        this.props.fetchDiary(this.props.match.params.id);
    }

    onSubmit =(formValues) => {
        this.props.editDiary(this.props.match.params.id, formValues);
    }

    render() {
        console.log(this.porps);
        if(!this.props.diary){
            return <div>Loading..</div>
        }
        return (
            <div>
                <h3>Edit the diary: {this.props.diary.title}</h3>
                <p>Created at: {this.props.diary.created_at}</p>
                <DiariesForm initialValues={_.pick(this.props.diary, "title", "content")} onSubmit={this.onSubmit}/>
                <br />
                <Link to="/diarys" className="item">
                    Go Back
                </Link>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    console.log(ownProps);
    return {diary: state.diaries[ownProps.match.params.id]};
}

export default connect(mapStateToProps, {fetchDiary, editDiary})(DiaryEdit);