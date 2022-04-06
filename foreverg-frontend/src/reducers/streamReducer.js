import {FETCH_STREAM, FETCH_STREAMS, CREATE_STREAM, EDIT_STREAM, DELETE_STREAM, COMMIT_STREAM, CLEAR_EVERYDAY_GOAL} from "../actions/types";
import _ from "lodash"
export default(state = {}, action) => {
    switch(action.type) {
        case FETCH_STREAMS:
            return {...state, ..._.mapKeys(action.payload, "id")};
        case FETCH_STREAM:
            return {...state, [action.payload.id]: action.payload};
        case CREATE_STREAM:
            return {...state, [action.payload.id]: action.payload};
        case EDIT_STREAM:
            return {...state, [action.payload.id]: action.payload};
        case DELETE_STREAM:
            return _.omit(state, action.payload);
        case COMMIT_STREAM:
            return {...state, [action.payload.id]: action.payload};
        case CLEAR_EVERYDAY_GOAL:
            return {};
        default:
            return state;
    }
}