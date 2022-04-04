import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import authReducer from "./authReducer";
import notifications from "./notificationsReducer";
import streamReducer from "./streamReducer";

export default combineReducers({
    auth: authReducer,
    form: formReducer,
    streams: streamReducer,
    notifications: notifications
});