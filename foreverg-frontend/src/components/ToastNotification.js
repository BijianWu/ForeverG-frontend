import React from 'react';
import { connect } from 'react-redux';
import { FaCheck, FaExclamationCircle, FaExclamationTriangle, FaInfoCircle, FaRegWindowClose } from 'react-icons/fa';
import "./ToastNotification.css";
import { deleteNotification } from "../actions"

class ToastNotification extends React.Component {

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
        let classN = `wbj-notification-container wbj-${this.props.position}`;
        return (
            <div className={classN}>
                {this.props.notifications.map((notification, index) => {
                    if(this.props.autoDeleteInterval){
                        setInterval(()=> {
                            this.props.deleteNotification(notification.id);
                        }, this.props.autoDeleteInterval);
                    }

                    return (
                        <div key={notification.id} style={{backgroundColor: this.generateBackgroundColor(notification.type)}} className='wbj-notification wbj-toast'>
                            <div className='wbj-notification-image'>
                                {this.generateIcon(notification.type)}
                            </div>
                            <div>
                                <FaRegWindowClose className='wbj-close-button' onClick={() => {this.props.deleteNotification(notification.id)}}/>
                                <p className='wbj-notification-title'>
                                    {notification.title}
                                </p>
                                <p className='wbj-notification-message'>
                                    {notification.message}
                                </p>
                            </div>
                        </div>
                    )
                })}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {notifications: state.notifications.notifications}
};

export default connect(mapStateToProps, {deleteNotification})(ToastNotification);