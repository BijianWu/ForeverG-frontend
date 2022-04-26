import { JUST_REGISTERED, SIGN_IN, SIGN_OUT, UN_JUST_REGISTERED } from "../actions/types";

const INITIAL_STATE = {
    isSignedIn: null,
    userId: null,
    accessToken: "",
    isJustRegistered: false
}

export default(state = INITIAL_STATE, action) => {
    switch(action.type){
        case SIGN_IN:
            return {...state, isSignedIn: true, userId: action.payload.userId, accessToken: action.payload.accessToken};
        case SIGN_OUT:
            return {...state, isSignedIn: false, userId: null};
        case JUST_REGISTERED:
            return {...state, isJustRegistered: true};
        case UN_JUST_REGISTERED:
            return {...state, isJustRegistered: false};
        default:
            return state;
    }
};