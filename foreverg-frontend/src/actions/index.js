import { CREATE_STREAM, SIGN_IN, SIGN_OUT, FETCH_STREAM, FETCH_STREAMS, DELETE_STREAM, EDIT_STREAM, REGISTER, COMMIT_STREAM } from "./types";
import streams from "../apis/goals";
import history from "../history";
import { todayDateCreator } from "../utils/todayDateCreator";

export const signIn = (userId, accessToken)=> {
    return{
        type: SIGN_IN,
        payload: {
            userId: userId,
            accessToken:accessToken
        }
    };
};

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
    const res = await streams.post("/auth/users/", { 
        username: formValues.username,
        password: formValues.password,
        email: formValues.email,
        first_name: formValues.first_name,
        last_name: formValues.last_name  
    });
    console.log("registering with the below response");
    console.log(res);
    // http://127.0.0.1:8000/auth/jwt/create
    const res2 = await streams.post("/auth/jwt/create/", { 
        username: formValues.username,
        password: formValues.password,
    });
    console.log("getting the access token");
    console.log(res2);
    dispatch({
        type: SIGN_IN,
        payload: {
            userId: res.data.id,
            accessToken: res2.data.access
        }
    })

    if (typeof(Storage) !== "undefined") {
        localStorage.setItem("FOREVER_G_TOKEN", res2.data.access);   
    }
    fetchEverydayGoals();
    history.push("/goals");
};

export const createEverydayGoal = (formValues) => async(dispatch, getState) => {
    const { userId, accessToken } = getState().auth;
    const res = await streams.post("/goals/everydaygoals/", { ...formValues, userId }, {headers: {Authorization:  `JWT ${accessToken}`}});
    dispatch({
        type: CREATE_STREAM,
        payload: res.data
    })

    history.push("/goals");
}


export const fetchEverydayGoal = (id) => async (dispatch, getState) => {
    const { userId, accessToken } = getState().auth;
    const response = await streams.get(`/goals/everydaygoals/${id}/`, {headers: {Authorization:  `JWT ${accessToken}`}});

    dispatch({type: FETCH_STREAM, payload: response.data});
}

export const editEverydayGoal = (id, formValues) => async (dispatch, getState) => {
    const { userId, accessToken } = getState().auth;
    const response = await streams.patch(`/goals/everydaygoals/${id}/`, formValues, {headers: {Authorization:  `JWT ${accessToken}`}});

    dispatch({type: EDIT_STREAM, payload: response.data});
    history.push("/goals");
}

export const deleteEverydayGoal = (id) => async (dispatch, getState) => {
    const { userId, accessToken } = getState().auth;
    await streams.delete(`/goals/everydaygoals/${id}/`, {headers: {Authorization:  `JWT ${accessToken}`}});

    dispatch({type: DELETE_STREAM, payload: id});
    history.push("/goals");
}

export const commitEverydayGoal = (id) => async (dispatch, getState) => {
    const { userId, accessToken } = getState().auth;
    const d = new Date();
    let month = d.getMonth() + 1;
    let formattedMonth = "";
    if(month  < 10){
        formattedMonth = "0"+month;
    }
    else {
        formattedMonth=""+month;
    }
    const response =await streams.patch(`/goals/everydaygoals/${id}/`, {updated_at: todayDateCreator()}, {headers: {Authorization:  `JWT ${accessToken}`}});

    console.log("modified the updated_at with the following data back");
    console.log(response.data);
    dispatch({type: COMMIT_STREAM, payload: response.data});
    history.push("/goals");
}