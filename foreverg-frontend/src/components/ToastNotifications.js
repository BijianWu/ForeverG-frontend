import React from 'react';
import { connect } from 'react-redux';
import { FaCheck, FaExclamationCircle, FaExclamationTriangle, FaInfoCircle } from 'react-icons/fa';
import "./ToastNotification.css";
import ToastNotification from './ToastNotification';

class ToastNotifications extends React.Component {

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
            <div className={`wbj-notification-container wbj-${this.props.position}`}>
                {this.props.notifications.map((notification, index) => 

                    <div key={notification.id} style={{backgroundColor: this.generateBackgroundColor(notification.type)}} className='wbj-notification wbj-toast'>
                        <ToastNotification notification={notification} autoDeleteInterval={this.props.autoDeleteInterval} />
                    </div>

                )}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {notifications: state.notifications.notifications}
};

export default connect(mapStateToProps, {})(ToastNotifications);