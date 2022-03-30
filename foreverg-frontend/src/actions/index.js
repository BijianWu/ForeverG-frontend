import { CREATE_STREAM, SIGN_IN, SIGN_OUT, FETCH_STREAM, FETCH_STREAMS, DELETE_STREAM, EDIT_STREAM } from "./types";
import streams from "../apis/goals";
import history from "../history";

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

export const createEverydayGoal = (formValues) => async(dispatch, getState) => {
    const { userId, accessToken } = getState().auth;
    const res = await streams.post("/goals/everydaygoals/", { ...formValues, userId }, {headers: {Authorization:  `JWT ${accessToken}`}});
    dispatch({
        type: CREATE_STREAM,
        payload: res.data
    })

    history.push("/goals");
}

export const fetchEverydayGoals = () => async (dispatch, getState) => {
    const { userId, accessToken } = getState().auth;
    const response = await streams.get("/goals/everydaygoals/", {headers: {Authorization:  `JWT ${accessToken}`}});
    console.log("fetching everyday goals");
    console.log(response.data.results);
    dispatch({type: FETCH_STREAMS, payload: response.data.results});
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