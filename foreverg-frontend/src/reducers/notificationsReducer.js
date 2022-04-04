import { ADD_NOTIFICATION, CLEAR_ALL_NOTIFICATIONS, DELETE_NOTIFICATION } from "../actions/types";

//testing only initial state
const INITIAL_STATE = {
    lastId: -1,
    notifications:[
    ]
}
const MAX_ID = 30;

export default(state = INITIAL_STATE, action) => {
    switch(action.type){
        case ADD_NOTIFICATION:
            let nextId = state.lastId + 1;
            if(nextId >= MAX_ID){
                nextId = 0;
            }
            let newArray = state.notifications.slice();
            // if(state.notifications.length > 2 ){
            //     //max 4 toast notifications
            //     newArray = state.notifications.slice(-4);
            // } else {
            //     newArray = state.notifications.slice();
            // }
            return {...state, lastId: nextId, notifications: [...newArray, {id: nextId, type: action.payload.type, title: action.payload.title, message: action.payload.message}]};
            // return [...state, action.payload];
        case DELETE_NOTIFICATION:
            return {...state, notifications: state.notifications.filter(a => a.id !== action.payload)};
            // return state.filter(a => a.id !== action.payload);
        case CLEAR_ALL_NOTIFICATIONS:
            return {...state, notifications: []};
            // return [];
        default:
            return state;
    }
};