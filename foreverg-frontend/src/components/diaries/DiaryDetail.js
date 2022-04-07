import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchDiary } from "../../actions";
import { DIARIES_EDIT_PAGE_LINK_PREFIX, DIARIES_HOME_PAGE_LINK } from "../../constants/pagesLink";

class DiaryDetail extends React.Component {
    constructor(props){
        super(props);
    }

    componentDidMount() {
        const { id } = this.props.match.params;
        this.props.fetchDiary(id);
    }

    render() {
        if(!this.props.diary){
            return <div>Loading...</div>
        }
        const {title, content, created_at, id, can_be_edited} = this.props.diary;

        let commitElement;

        if (can_be_edited) {
            commitElement =                 <Link to={`${DIARIES_EDIT_PAGE_LINK_PREFIX}/${this.props.diary.id}`} className="item">
            Edit
        </Link>
        } else {
            // commitElement = <p>Not today's diary, you cannot edit it anymore, you can only edit same day diary</p>
            commitElement = <p></p>
        }
        return (
            <React.Fragment>
            <div className="container">
                <div className="ui vertical segment">
                    <h2 className="ui icon aligned  header">
                        <i className="icon bullseye"></i>
                        Diary Title: {title}
                    </h2>
                </div>
                
                <div className="ui vertical padded segment">
                    <p>Content:</p>
                    <div className="ui raised segment">
                        <p>{content}</p>
                    </div>
                </div>

                <div className="ui vertical padded segment">
                    <p>Created at:</p>
                    <div className="ui raised segment">
                        <p>{created_at}</p>
                    </div>
                </div>

                <div className="ui vertical padded segment">
                    <div className="ui raised segment">
                        {commitElement}
                    </div>
                </div>

            </div>
            {/* {commitElement} */}
            <br />
            <div>
                <Link to={`${DIARIES_HOME_PAGE_LINK}`} className="item">
                    Go Back
                </Link>
                <br/><br/>
            </div>

            </React.Fragment>
           
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return { diary: state.diaries[ownProps.match.params.id]};
}

export default connect(mapStateToProps, {fetchDiary})(DiaryDetail);