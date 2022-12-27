import * as Types from './pageTypes';

export const showLoader = () => {
    return async function (dispatch, getState) {
        dispatch({ type: Types.SHOW_LOADER, payload: true });

    };
}

export const hideLoader = () => {
    return async function (dispatch, getState) { /*return someApiCall(id).then(res => {
            dispatch({type: 'FOO', payload: res});
        });*/
        dispatch({ type: Types.HIDE_LOADER, payload: false });

    };
}

export const setAuthInformation = (authToken = null, serverToken = null, isLoggedIn = false) => {
    return async function (dispatch, getState) {
        await dispatch({ type: Types.SET_AUTH_TOKEN, payload: authToken });
        await dispatch({ type: Types.SET_SERVER_TOKEN, payload: serverToken });
        await dispatch({ type: Types.SET_USER_LOGGING_FLAG, payload: isLoggedIn });

    };

}
export const setAuthToken = (authToken = null) => {
    return async function (dispatch, getState) {
        dispatch({ type: Types.HIDE_LOADER, payload: authToken });


    };
}


export const setServerToken = (serverToken = null) => {

    return async function (dispatch, getState) {
        dispatch({ type: Types.SET_SERVER_TOKEN, payload: serverToken });
    };
}


export const setUserLoginStatus = (isLoggedIn = false) => {
    return async function (dispatch, getState) {
        dispatch({ type: Types.SET_USER_LOGGING_FLAG, payload: isLoggedIn });

    };
}

export const setErrorInfo = (payload = { type: '', class: '', message: '' }) => {
    return async function (dispatch, getState) {
        dispatch({ type: Types.SET_ERROR_INFO, payload: payload });
    };
}