import React from 'react';
import { connect } from 'react-redux';
import { FaCheck, FaExclamationCircle, FaExclamationTriangle, FaInfoCircle, FaRegWindowClose } from 'react-icons/fa';
import "./ToastNotification.css";
import { deleteNotification } from "../actions"

class ToastNotification extends React.Component {
    componentDidMount(){
        setTimeout(() => {
            this.props.deleteNotification(this.props.notification.id);
        }, this.props.autoDeleteInterval);
    }
    generateIcon = (type) =>{
        switch(type){
            case "INFO":
                return <FaInfoCircle />
            case "WARNING":
                return <FaExclamationTriangle />
            case "ERROR":
                return <FaExclamationCircle />
            case "SUCCESS":
                return <FaCheck /> 
            default:
                throw new Error("what icons are you looking for?");
        }
    }

    generateBackgroundColor = (type) =>{
        switch(type){
            case "INFO":
                return '#5bc0de';
            case "WARNING":
                return '#f0ad4e';
            case "ERROR":
                return '#d9534f';
            case "SUCCESS":
                return '#5cb85c';
            default:
                throw new Error("what icons are you looking for?");
        }
    }
    render(){
        return (
            <React.Fragment>
                <div className='wbj-notification-image'>
                    {this.generateIcon(this.props.notification.type)}
                </div>
                <div>
                    <FaRegWindowClose className='wbj-close-button' onClick={() => {this.props.deleteNotification(this.props.notification.id)}}/>
                    <p className='wbj-notification-title'>
                        {this.props.notification.title}
                    </p>
                    <p className='wbj-notification-message'>
                        {this.props.notification.message}
                    </p>
                </div>
            </React.Fragment>

        )
    }
}

// const mapStateToProps = (state) => {
//     return {notifications: state.notifications.notifications}
// };

export default connect(null, {deleteNotification})(ToastNotification);