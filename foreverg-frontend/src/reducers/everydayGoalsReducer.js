import {CREATE_EVERYDAY_GOAL, FETCH_EVERYDAY_GOALS, FETCH_EVERYDAY_GOAL, EDIT_EVERYDAY_GOAL, DELETE_EVERYDAY_GOAL, COMMIT_EVERYDAY_GOAL, CLEAR_EVERYDAY_GOALS} from "../actions/types";
import _ from "lodash"
export default(state = {}, action) => {
    switch(action.type) {
        case FETCH_EVERYDAY_GOALS:
            return {...state, ..._.mapKeys(action.payload, "id")};
        case CREATE_EVERYDAY_GOAL:
            return {...state, [action.payload.id]: action.payload};
        case FETCH_EVERYDAY_GOAL:
            return {...state, [action.payload.id]: action.payload};
        case EDIT_EVERYDAY_GOAL:
            return {...state, [action.payload.id]: action.payload};
        case DELETE_EVERYDAY_GOAL:
            return _.omit(state, action.payload);
        case COMMIT_EVERYDAY_GOAL:
            return {...state, [action.payload.id]: action.payload};
        case CLEAR_EVERYDAY_GOALS:
            return {};
        default:
            return state;
    }
}