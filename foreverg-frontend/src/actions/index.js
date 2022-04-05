import { CREATE_STREAM, SIGN_IN, SIGN_OUT, FETCH_STREAM, FETCH_STREAMS, DELETE_STREAM, EDIT_STREAM, REGISTER, COMMIT_STREAM, CLEAR_EVERYDAY_GOAL, CLEAR_ALL_NOTIFICATIONS, ADD_NOTIFICATION, DELETE_NOTIFICATION, FETCH_DIARIES, CREATE_DIARY, FETCH_DIARY, EDIT_DIARY, DELETE_DIARY, CREATE_FUTURE_TASK, FETCH_FUTURE_TASKS, FETCH_FUTURE_TASK, EDIT_FUTURE_TASK, DELETE_FUTURE_TASK } from "./types";
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
    console.log("fetching everyday goals");
    console.log(response.data.results);
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
                console.log("getting the access token");
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
                history.push("/goals");
            }).catch(
                e => {
                    console.log(e); 
                    console.log("error happened during registered then log in");
                    dispatch({type: ADD_NOTIFICATION, payload: {type: "ERROR", title: 'Auto log in failed',message: 'please manually log in'}});
            })

        }
    )
    .catch(
        e => {
            console.log(e); 
            console.log("error happened during register");
            dispatch({type: ADD_NOTIFICATION, payload: {type: "ERROR", title: 'Failed to Register',message: 'please try again'}});
    })


};

export const createEverydayGoal = (formValues) => async(dispatch, getState) => {
    const { userId, accessToken } = getState().auth;
    // const res = await streams.post("/goals/everydaygoals/", { ...formValues, userId }, {headers: {Authorization:  `JWT ${accessToken}`}});
    await streams.post("/goals/everydaygoals/", { ...formValues, userId }, {headers: {Authorization:  `JWT ${accessToken}`}})
        .then(
            res => {
                console.log(res);
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
                console.log(e); 
                console.log("error happened");
                dispatch({type: ADD_NOTIFICATION, payload: {type: "ERROR", title: 'Failed to create the goal',message: 'please try again later'}});
                //TODO: handle the error by push a toast notification
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
            console.log(e); 
            console.log("error happened");
            dispatch({type: ADD_NOTIFICATION, payload: {type: "ERROR", title: 'Cannot get the goal',message: 'please try again later'}});
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
            console.log(e); 
            console.log("error happened during gettting the goal");
            dispatch({type: ADD_NOTIFICATION, payload: {type: "ERROR", title: 'Cannot edit the goal',message: 'please try again later'}});
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
            console.log(e); 
            console.log("error happened during detting the goal");
            dispatch({type: ADD_NOTIFICATION, payload: {type: "ERROR", title: 'Cannot delete the goal',message: 'please try again later'}});
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
            console.log(e); 
            console.log("error happened during detting the goal");
            dispatch({type: ADD_NOTIFICATION, payload: {type: "ERROR", title: 'Cannot commit the goal' ,message: 'please try again later'}});
        }
    )
}



//diaries
export const fetchDiaries = () => async (dispatch, getState) => {
    const { userId, accessToken } = getState().auth;
    const response = await streams.get("/goals/diarys/", {headers: {Authorization:  `JWT ${accessToken}`}});

    console.log(response.data.results);
    dispatch({type: FETCH_DIARIES, payload: response.data.results});
}

export const createDiary = (formValues) => async(dispatch, getState) => {
    const { userId, accessToken } = getState().auth;

    await streams.post("/goals/diarys/", { ...formValues, userId }, {headers: {Authorization:  `JWT ${accessToken}`}})
        .then(
            res => {
                console.log(res);
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
                console.log(e); 
                console.log("error happened");
                dispatch({type: ADD_NOTIFICATION, payload: {type: "ERROR", title: 'Failed to create the diary',message: 'please try again later'}});
                //TODO: handle the error by push a toast notification
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
            console.log(e); 
            console.log("error happened");
            dispatch({type: ADD_NOTIFICATION, payload: {type: "ERROR", title: 'Cannot get the diary',message: 'please try again later'}});
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
            console.log(e); 
            console.log("error happened during gettting the goal");
            dispatch({type: ADD_NOTIFICATION, payload: {type: "ERROR", title: 'Cannot edit the goal',message: 'please try again later'}});
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
            console.log(e); 
            console.log("error happened during detting the goal");
            dispatch({type: ADD_NOTIFICATION, payload: {type: "ERROR", title: 'Cannot delete the diary',message: 'please try again later'}});
        }
    )
}

//future tasks
export const fetchFutureTasks = () => async (dispatch, getState) => {
    const { userId, accessToken } = getState().auth;
    const response = await streams.get("/goals/futuretasks/", {headers: {Authorization:  `JWT ${accessToken}`}});

    console.log(response.data.results);
    dispatch({type: FETCH_FUTURE_TASKS, payload: response.data.results});
}

export const createFutureTask = (formValues) => async(dispatch, getState) => {
    const { userId, accessToken } = getState().auth;

    await streams.post("/goals/futuretasks/", { ...formValues, userId }, {headers: {Authorization:  `JWT ${accessToken}`}})
        .then(
            res => {
                console.log(res);
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
                console.log(e); 
                console.log("error happened during creating the future task");
                dispatch({type: ADD_NOTIFICATION, payload: {type: "ERROR", title: 'Failed to create the future task',message: 'please try again later'}});
                //TODO: handle the error by push a toast notification
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
            console.log(e); 
            console.log("error happened during getting the future task");
            dispatch({type: ADD_NOTIFICATION, payload: {type: "ERROR", title: 'Cannot get the future task',message: 'please try again later'}});
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
            console.log(e); 
            console.log("error happened during gettting the future task");
            dispatch({type: ADD_NOTIFICATION, payload: {type: "ERROR", title: 'Cannot edit the future task',message: 'please try again later'}});
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
            console.log(e); 
            console.log("error happened during detting the future task");
            dispatch({type: ADD_NOTIFICATION, payload: {type: "ERROR", title: 'Cannot delete the future task',message: 'please try again later'}});
        }
    )
}