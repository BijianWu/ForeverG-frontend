import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import authReducer from "./authReducer";
import diariesReducer from "./diariesReducer";
import futureTasksReducer from "./futureTasksReducer";
import notifications from "./notificationsReducer";
import everydayGoalsReducer from "./everydayGoalsReducer";

export default combineReducers({
    auth: authReducer,
    form: formReducer,
    everydayGoals: everydayGoalsReducer,
    notifications: notifications,
    diaries: diariesReducer,
    futureTasks: futureTasksReducer
});