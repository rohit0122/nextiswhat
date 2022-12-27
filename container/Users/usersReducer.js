import * as Types from './usersTypes';
import { HYDRATE } from 'next-redux-wrapper';

const initialState = {
    usersList: [],
};

const usersReducer = (state = initialState, action) => {

    switch (action.type) {
        case Types.SET_USERS_DATA:
            return {
                ...state,
                usersList: action.payload.data
            }
        case HYDRATE:
            const usersList = action.payload.users.usersList;
            return {
                ...state,
                usersList
            }
        default:
            return state
    }
}
export default usersReducer;
