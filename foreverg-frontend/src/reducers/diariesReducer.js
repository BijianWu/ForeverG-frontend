import { CREATE_DIARY, DELETE_DIARY, EDIT_DIARY, FETCH_DIARIES, FETCH_DIARY } from "../actions/types";
import _ from "lodash"

export default(state = {}, action) => {
    switch(action.type) {
        case FETCH_DIARIES:
            return {...state, ..._.mapKeys(action.payload, "id")};
        case FETCH_DIARY:
            return {...state, [action.payload.id]: action.payload};
        case CREATE_DIARY:
            return {...state, [action.payload.id]: action.payload};
        case EDIT_DIARY:
            return {...state, [action.payload.id]: action.payload};
        case DELETE_DIARY:
            return _.omit(state, action.payload);

        default:
            return state;
    }
}