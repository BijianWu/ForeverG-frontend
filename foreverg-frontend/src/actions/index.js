import { CREATE_STREAM, SIGN_IN, SIGN_OUT, FETCH_STREAM, FETCH_STREAMS, DELETE_STREAM, EDIT_STREAM } from "./types";
import streams from "../apis/goals";
import history from "../history";

export const signIn = (userId)=> {
    return{
        type: SIGN_IN,
        payload: userId
    };
};

export const signOut = ()=> {
    return{
        type: SIGN_OUT
    };
};

export const createEverydayGoal = (formValues) => async(dispatch, getState) => {
    const { userId } = getState().auth;
    const res = await streams.post("/goals/everydaygoals", { ...formValues, userId });
    console.log(res);
    dispatch({
        type: CREATE_STREAM,
        payload: res.data
    })

    history.push("/");
}

export const fetchEverydayGoals = () => async dispatch => {
    const response = await streams.get("/goals/everydaygoals");

    dispatch({type: FETCH_STREAMS, payload: response.data});
}

export const fetchEverydayGoal = (id) => async dispatch => {
    const response = await streams.get(`/goals/everydaygoals/${id}`);

    dispatch({type: FETCH_STREAM, payload: response.data});
}

export const editEverydayGoal = (id, formValues) => async dispatch => {
    const response = await streams.patch(`/goals/everydaygoals/${id}`, formValues);

    dispatch({type: EDIT_STREAM, payload: response.data});
    history.push("/");
}

export const deleteEverydayGoal = (id) => async dispatch => {
    await streams.delete(`/goals/everydaygoals/${id}`);

    dispatch({type: DELETE_STREAM, payload: id});
    history.push("/");
}