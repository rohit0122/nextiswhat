import * as Types from './pageTypes';

const initialState = {
    loading: false,
    authToken: null,
    serverToken: null,
    isUserLoggedIn: false,
    errorInfo: {
        type: '',
        class: '',
        message: ''
    }
};

const pageReducer = (state = initialState, action) => {

    switch (action.type) {
        case Types.SHOW_LOADER:
            return {
                ...state,
                loading: true
            }
        case Types.HIDE_LOADER:
            return {
                ...state,
                loading: false

            }
        case Types.SET_AUTH_TOKEN:
            console.log('action.payload', action.payload)


            return {
                ...state,
                authToken: action.payload
            }
        case Types.SET_SERVER_TOKEN:
            return {
                ...state,
                serverToken: action.payload
            }

        case Types.SET_USER_LOGGING_FLAG:
            return {
                ...state,
                isUserLoggedIn: action.payload
            }
        case Types.SET_ERROR_INFO:
            return {
                ...state,
                errorInfo: action.payload
            }
        default:
            return state
    }
}
export default pageReducer;
