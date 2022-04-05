import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import authReducer from "./authReducer";
import diariesReducer from "./diariesReducer";
import notifications from "./notificationsReducer";
import streamReducer from "./streamReducer";

export default combineReducers({
    auth: authReducer,
    form: formReducer,
    streams: streamReducer,
    notifications: notifications,
    diaries: diariesReducer
});