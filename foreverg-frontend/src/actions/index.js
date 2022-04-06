import { CREATE_STREAM, SIGN_IN, SIGN_OUT, FETCH_STREAM, FETCH_STREAMS, DELETE_STREAM, EDIT_STREAM, REGISTER, COMMIT_STREAM, CLEAR_EVERYDAY_GOAL, CLEAR_ALL_NOTIFICATIONS, ADD_NOTIFICATION, DELETE_NOTIFICATION, FETCH_DIARIES, CREATE_DIARY, FETCH_DIARY, EDIT_DIARY, DELETE_DIARY, CREATE_FUTURE_TASK, FETCH_FUTURE_TASKS, FETCH_FUTURE_TASK, EDIT_FUTURE_TASK, DELETE_FUTURE_TASK, COMPLETE_FUTURE_TASK, CLEAR_ALL_FUTURE_TASKS, CLEAR_ALL_DIARIES } from "./types";
import streams from "../apis/goals";
import history from "../history";
import { todayDateCreator } from "../utils/todayDateCreator";

export const clearAllNotifications = () => async (dispatch, getState) => {
    dispatch({type: CLEAR_ALL_NOTIFICATIONS});
}

export const deleteNotification = (id) => async (dispatch, getState) => {
    dispatch({type: DELETE_NOTIFICATION, payload: id});
}

//id, type, title, message
export const addNotification = (notification) => async (dispatch, getState) => {
    
    dispatch({type: ADD_NOTIFICATION, payload: notification});
}

export const signIn = (userId, accessToken)=> {
    return{
        type: SIGN_IN,
        payload: {
            userId: userId,
            accessToken:accessToken
        }
    };
};
export const clearEverydayGoals = () => async (dispatch, getState) => {
    dispatch({type: CLEAR_EVERYDAY_GOAL});
}
export const signOut = ()=> {
    return{
        type: SIGN_OUT
    };
};


export const fetchEverydayGoals = () => async (dispatch, getState) => {
    const { userId, accessToken } = getState().auth;
    const response = await streams.get("/goals/everydaygoals/", {headers: {Authorization:  `JWT ${accessToken}`}});

    dispatch({type: FETCH_STREAMS, payload: response.data.results});
}

export const register = (formValues) => async(dispatch, getState) => {
    await streams.post("/auth/users/", { 
        username: formValues.username,
        password: formValues.password,
        email: formValues.email,
        first_name: formValues.first_name,
        last_name: formValues.last_name  
    })
    .then(
        async registerResponse => {
            dispatch({type: ADD_NOTIFICATION, payload: {type: "SUCCESS", title: 'Registered successfully',message: 'successfully registed.'}});
            // http://127.0.0.1:8000/auth/jwt/create
            await streams.post("/auth/jwt/create/", { 
                username: formValues.username,
                password: formValues.password,
            }).then(getJWTTokenResponse => {

                dispatch({
                    type: SIGN_IN,
                    payload: {
                        userId: registerResponse.data.id,
                        accessToken: getJWTTokenResponse.data.access
                    }
                })
                dispatch({type: ADD_NOTIFICATION, payload: {type: "SUCCESS", title: 'Auto Logged in',message: 'Auto logged in successfully.'}});
                if (typeof(Storage) !== "undefined") {
                    localStorage.setItem("FOREVER_G_TOKEN", getJWTTokenResponse.data.access);   
                }
                fetchEverydayGoals();
                history.push("/");
            }).catch(
                e => {
                    if(e.response && e.response.data && e.response.data.errorTitle){
                        dispatch({type: ADD_NOTIFICATION, payload: {type: "ERROR", title: e.response.data.errorTitle, message: e.response.data.errorMessage}});
                    } else{
                        dispatch({type: ADD_NOTIFICATION, payload: {type: "ERROR", title: 'Auto log in failed',message: 'please manually log in'}});
                    }
            })

        }
    )
    .catch(
        e => {
            if(e.response && e.response.data && e.response.data.errorTitle){
                dispatch({type: ADD_NOTIFICATION, payload: {type: "ERROR", title: e.response.data.errorTitle, message: e.response.data.errorMessage}});
            } else{
                dispatch({type: ADD_NOTIFICATION, payload: {type: "ERROR", title: 'Failed to Register',message: 'please try again'}});
            }
    })
};

export const createEverydayGoal = (formValues) => async(dispatch, getState) => {
    const { userId, accessToken } = getState().auth;
    // const res = await streams.post("/goals/everydaygoals/", { ...formValues, userId }, {headers: {Authorization:  `JWT ${accessToken}`}});
    await streams.post("/goals/everydaygoals/", { ...formValues, userId }, {headers: {Authorization:  `JWT ${accessToken}`}})
        .then(
            res => {
                dispatch({
                    type: CREATE_STREAM,
                    payload: res.data
                })
                dispatch({type: ADD_NOTIFICATION, payload: {type: "SUCCESS", title: 'Created a new goal',message: 'Successfully created a new goal'}});
                history.push("/goals")
            }
        )
        .catch(
            e => {
                if(e.response && e.response.data && e.response.data.errorTitle){
                    dispatch({type: ADD_NOTIFICATION, payload: {type: "ERROR", title: e.response.data.errorTitle, message: e.response.data.errorMessage}});
                } else{
                    dispatch({type: ADD_NOTIFICATION, payload: {type: "ERROR", title: 'Failed to create the goal',message: 'please try again later'}});
                }
            }
        )
}


export const fetchEverydayGoal = (id) => async (dispatch, getState) => {
    const { userId, accessToken } = getState().auth;

    await streams.get(`/goals/everydaygoals/${id}/`, {headers: {Authorization:  `JWT ${accessToken}`}})
    .then(
        response => {
            dispatch({type: FETCH_STREAM, payload: response.data});
        }
    )
    .catch(
        e => {
            if(e.response && e.response.data && e.response.data.errorTitle){
                dispatch({type: ADD_NOTIFICATION, payload: {type: "ERROR", title: e.response.data.errorTitle, message: e.response.data.errorMessage}});
            } else{
                dispatch({type: ADD_NOTIFICATION, payload: {type: "ERROR", title: 'Cannot get the goal',message: 'please try again later'}});
            }

        }
    )
}

export const editEverydayGoal = (id, formValues) => async (dispatch, getState) => {
    const { userId, accessToken } = getState().auth;

    await streams.patch(`/goals/everydaygoals/${id}/`, formValues, {headers: {Authorization:  `JWT ${accessToken}`}})
    .then(
        response => {
            dispatch({type: ADD_NOTIFICATION, payload: {type: "SUCCESS", title: 'Edited the goal',message: 'Successfully edited the goal'}});
            dispatch({type: EDIT_STREAM, payload: response.data});
            history.push("/goals");
        }
    )
    .catch(
        e => {
            if(e.response && e.response.data && e.response.data.errorTitle){
                dispatch({type: ADD_NOTIFICATION, payload: {type: "ERROR", title: e.response.data.errorTitle, message: e.response.data.errorMessage}});
            } else{
                dispatch({type: ADD_NOTIFICATION, payload: {type: "ERROR", title: 'Cannot edit the goal',message: 'please try again later'}});
            }
        }
    )
}

export const deleteEverydayGoal = (id) => async (dispatch, getState) => {
    const { userId, accessToken } = getState().auth;

    await streams.delete(`/goals/everydaygoals/${id}/`, {headers: {Authorization:  `JWT ${accessToken}`}})
    .then(
        response => {
            dispatch({type: ADD_NOTIFICATION, payload: {type: "INFO", title: 'Deleted the goal',message: 'Successfully deleted the goal'}});
            dispatch({type: DELETE_STREAM, payload: id});
            history.push("/goals");
        }
    )
    .catch(
        e => {
            if(e.response && e.response.data && e.response.data.errorTitle){
                dispatch({type: ADD_NOTIFICATION, payload: {type: "ERROR", title: e.response.data.errorTitle, message: e.response.data.errorMessage}});
            } else{
                dispatch({type: ADD_NOTIFICATION, payload: {type: "ERROR", title: 'Cannot delete the goal',message: 'please try again later'}});
            }
            
        }
    )
}

export const commitEverydayGoal = (id) => async (dispatch, getState) => {
    const { userId, accessToken } = getState().auth;
    const d = new Date();
    let month = d.getMonth() + 1;
    let formattedMonth = "";
    if(month  < 10){
        formattedMonth = "0"+month;
    } else {
        formattedMonth=""+month;
    }

    await streams.patch(`/goals/everydaygoals/${id}/`, {updated_at: todayDateCreator()}, {headers: {Authorization:  `JWT ${accessToken}`}})
    .then(
        response => {
            dispatch({type: ADD_NOTIFICATION, payload: {type: "SUCCESS", title: 'Commmited the goal', message: 'Successfully commited the goal'}});

            dispatch({type: COMMIT_STREAM, payload: response.data});
            history.push("/goals");
        }
    )
    .catch(
        e => {
            if(e.response && e.response.data && e.response.data.errorTitle){
                dispatch({type: ADD_NOTIFICATION, payload: {type: "ERROR", title: e.response.data.errorTitle, message: e.response.data.errorMessage}});
            } else{
                dispatch({type: ADD_NOTIFICATION, payload: {type: "ERROR", title: 'Cannot commit the goal' ,message: 'please try again later'}});
            }
        }
    )
}



//diaries
export const fetchDiaries = () => async (dispatch, getState) => {
    const { userId, accessToken } = getState().auth;
    const response = await streams.get("/goals/diarys/", {headers: {Authorization:  `JWT ${accessToken}`}});

    dispatch({type: FETCH_DIARIES, payload: response.data.results});
}

export const createDiary = (formValues) => async(dispatch, getState) => {
    const { userId, accessToken } = getState().auth;

    await streams.post("/goals/diarys/", { ...formValues, userId }, {headers: {Authorization:  `JWT ${accessToken}`}})
        .then(
            res => {
                dispatch({
                    type: CREATE_DIARY,
                    payload: res.data
                })
                dispatch({type: ADD_NOTIFICATION, payload: {type: "SUCCESS", title: 'Created a new diary',message: 'Successfully created a new diary'}});
                history.push("/diarys")
            }
        )
        .catch(
            e => {
                if(e.response && e.response.data && e.response.data.errorTitle){
                    dispatch({type: ADD_NOTIFICATION, payload: {type: "ERROR", title: e.response.data.errorTitle, message: e.response.data.errorMessage}});
                } else{
                    dispatch({type: ADD_NOTIFICATION, payload: {type: "ERROR", title: 'Failed to create the diary',message: 'please try again later'}});
                }
            }
        )
}


export const fetchDiary = (id) => async (dispatch, getState) => {
    const { userId, accessToken } = getState().auth;

    await streams.get(`/goals/diarys/${id}/`, {headers: {Authorization:  `JWT ${accessToken}`}})
    .then(
        response => {
            dispatch({type: FETCH_DIARY, payload: response.data});
        }
    )
    .catch(
        e => {
            if(e.response && e.response.data && e.response.data.errorTitle){
                dispatch({type: ADD_NOTIFICATION, payload: {type: "ERROR", title: e.response.data.errorTitle, message: e.response.data.errorMessage}});
            } else{
                dispatch({type: ADD_NOTIFICATION, payload: {type: "ERROR", title: 'Cannot get the diary',message: 'please try again later'}});
            }

        }
    )
}

export const editDiary = (id, formValues) => async (dispatch, getState) => {
    const { userId, accessToken } = getState().auth;

    await streams.patch(`/goals/diarys/${id}/`, formValues, {headers: {Authorization:  `JWT ${accessToken}`}})
    .then(
        response => {
            dispatch({type: ADD_NOTIFICATION, payload: {type: "SUCCESS", title: 'Edited the diary',message: 'Successfully edited the diary'}});
            dispatch({type: EDIT_DIARY, payload: response.data});
            history.push("/diarys");
        }
    )
    .catch(
        e => {
            if(e.response && e.response.data && e.response.data.errorTitle){
                dispatch({type: ADD_NOTIFICATION, payload: {type: "ERROR", title: e.response.data.errorTitle, message: e.response.data.errorMessage}});
            } else{
                dispatch({type: ADD_NOTIFICATION, payload: {type: "ERROR", title: 'Cannot edit the goal',message: 'please try again later'}});
            }

        }
    )
}

export const deleteDiary = (id) => async (dispatch, getState) => {
    const { userId, accessToken } = getState().auth;

    await streams.delete(`/goals/diarys/${id}/`, {headers: {Authorization:  `JWT ${accessToken}`}})
    .then(
        response => {
            dispatch({type: ADD_NOTIFICATION, payload: {type: "INFO", title: 'Deleted the diary',message: 'Successfully deleted the diary'}});
            dispatch({type: DELETE_DIARY, payload: id});
            history.push("/diarys");
        }
    )
    .catch(
        e => {
            if(e.response && e.response.data && e.response.data.errorTitle){
                dispatch({type: ADD_NOTIFICATION, payload: {type: "ERROR", title: e.response.data.errorTitle, message: e.response.data.errorMessage}});
            } else{
                dispatch({type: ADD_NOTIFICATION, payload: {type: "ERROR", title: 'Cannot delete the diary',message: 'please try again later'}});
            }

        }
    )
}

export const clearAllDiaries = () => async (dispatch, getState) => {
    dispatch({type: CLEAR_ALL_DIARIES});
}


//future tasks
export const fetchFutureTasks = () => async (dispatch, getState) => {
    const { userId, accessToken } = getState().auth;
    const response = await streams.get("/goals/futuretasks/", {headers: {Authorization:  `JWT ${accessToken}`}});

    dispatch({type: FETCH_FUTURE_TASKS, payload: response.data.results});
}

export const createFutureTask = (formValues) => async(dispatch, getState) => {
    const { userId, accessToken } = getState().auth;

    await streams.post("/goals/futuretasks/", { ...formValues, userId }, {headers: {Authorization:  `JWT ${accessToken}`}})
        .then(
            res => {
                dispatch({
                    type: CREATE_FUTURE_TASK,
                    payload: res.data
                })
                dispatch({type: ADD_NOTIFICATION, payload: {type: "SUCCESS", title: 'Created a new future task',message: 'Successfully created a new future task'}});
                history.push("/futureTasks")
            }
        )
        .catch(
            e => {
                if(e.response && e.response.data && e.response.data.errorTitle){
                    dispatch({type: ADD_NOTIFICATION, payload: {type: "ERROR", title: e.response.data.errorTitle, message: e.response.data.errorMessage}});
                } else{
                    dispatch({type: ADD_NOTIFICATION, payload: {type: "ERROR", title: 'Failed to create the future task',message: 'please try again later'}});
                }
            }
        )
}


export const fetchFutureTask = (id) => async (dispatch, getState) => {
    const { userId, accessToken } = getState().auth;

    await streams.get(`/goals/futuretasks/${id}/`, {headers: {Authorization:  `JWT ${accessToken}`}})
    .then(
        response => {
            dispatch({type: FETCH_FUTURE_TASK, payload: response.data});
        }
    )
    .catch(
        e => {
            if(e.response && e.response.data && e.response.data.errorTitle){
                dispatch({type: ADD_NOTIFICATION, payload: {type: "ERROR", title: e.response.data.errorTitle, message: e.response.data.errorMessage}});
            } else{
                dispatch({type: ADD_NOTIFICATION, payload: {type: "ERROR", title: 'Cannot get the future task',message: 'please try again later'}});
            }

        }
    )
}

export const editFutureTask = (id, formValues) => async (dispatch, getState) => {
    const { userId, accessToken } = getState().auth;

    await streams.patch(`/goals/futuretasks/${id}/`, formValues, {headers: {Authorization:  `JWT ${accessToken}`}})
    .then(
        response => {
            dispatch({type: ADD_NOTIFICATION, payload: {type: "SUCCESS", title: 'Edited the future task',message: 'Successfully edited the future task'}});
            dispatch({type: EDIT_FUTURE_TASK, payload: response.data});
            history.push("/futureTasks");
        }
    )
    .catch(
        e => {
            if(e.response && e.response.data && e.response.data.errorTitle){
                dispatch({type: ADD_NOTIFICATION, payload: {type: "ERROR", title: e.response.data.errorTitle, message: e.response.data.errorMessage}});
            } else{
                dispatch({type: ADD_NOTIFICATION, payload: {type: "ERROR", title: 'Cannot edit the future task',message: 'please try again later'}});
            }
        }
    )
}

export const deleteFutureTask = (id) => async (dispatch, getState) => {
    const { userId, accessToken } = getState().auth;

    await streams.delete(`/goals/futuretasks/${id}/`, {headers: {Authorization:  `JWT ${accessToken}`}})
    .then(
        response => {
            dispatch({type: ADD_NOTIFICATION, payload: {type: "INFO", title: 'Deleted the future task',message: 'Successfully deleted the future task'}});
            dispatch({type: DELETE_FUTURE_TASK, payload: id});
            history.push("/futureTasks");
        }
    )
    .catch(
        e => {
            if(e.response && e.response.data && e.response.data.errorTitle){
                dispatch({type: ADD_NOTIFICATION, payload: {type: "ERROR", title: e.response.data.errorTitle, message: e.response.data.errorMessage}});
            } else{
                dispatch({type: ADD_NOTIFICATION, payload: {type: "ERROR", title: 'Cannot delete the future task',message: 'please try again later'}});
            }

        }
    )
}

export const completeFutureTask = (id) => async (dispatch, getState) => {
    const { userId, accessToken } = getState().auth;
    const d = new Date();
    let month = d.getMonth() + 1;
    let formattedMonth = "";
    if(month  < 10){
        formattedMonth = "0"+month;
    } else {
        formattedMonth=""+month;
    }

    await streams.patch(`goals/futuretasks/${id}/`, {updated_at: todayDateCreator()}, {headers: {Authorization:  `JWT ${accessToken}`}})
    .then(
        response => {
            dispatch({type: ADD_NOTIFICATION, payload: {type: "SUCCESS", title: 'Completed the task', message: 'Successfully completed the task'}});

            dispatch({type: COMPLETE_FUTURE_TASK, payload: response.data});
            history.push("/futuretasks");
        }
    )
    .catch(
        e => {
            if(e.response && e.response.data && e.response.data.errorTitle){
                dispatch({type: ADD_NOTIFICATION, payload: {type: "ERROR", title: e.response.data.errorTitle, message: e.response.data.errorMessage}});
            } else{
                dispatch({type: ADD_NOTIFICATION, payload: {type: "ERROR", title: 'Cannot complete the goal' ,message: 'please try again later'}});
            }

        }
    )
}

export const clearAllFutureTasks = () => async (dispatch, getState) => {
    dispatch({type: CLEAR_ALL_FUTURE_TASKS});
}