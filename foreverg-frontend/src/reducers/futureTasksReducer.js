import { CREATE_FUTURE_TASK, DELETE_FUTURE_TASK, EDIT_FUTURE_TASK, FETCH_FUTURE_TASK, FETCH_FUTURE_TASKS } from "../actions/types";
import _ from "lodash"

export default(state = {}, action) => {
    switch(action.type) {
        case FETCH_FUTURE_TASKS:
            return {...state, ..._.mapKeys(action.payload, "id")};
        case FETCH_FUTURE_TASK:
            return {...state, [action.payload.id]: action.payload};
        case CREATE_FUTURE_TASK:
            return {...state, [action.payload.id]: action.payload};
        case EDIT_FUTURE_TASK:
            return {...state, [action.payload.id]: action.payload};
        case DELETE_FUTURE_TASK:
            return _.omit(state, action.payload);

        default:
            return state;
    }
}