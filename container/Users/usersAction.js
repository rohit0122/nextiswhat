import * as Types from './usersTypes';
import axios from 'axios';
import { getHeaders, loginAPI, getUsersAPI, signUpAPI } from '../../constants';
import jwt from 'jsonwebtoken';
import Cookies from 'js-cookie'
import { setAuthInformation, setErrorInfo } from '../Page/pageActions';

export const setUsersData = (requestObj) => {
    return async function (dispatch, getState) {
        const token = requestObj.cookies?._serverToken || null;
        const headers = getHeaders(token);
        console.log('headersheadersheaders::::', headers)
        if (token) {
            await axios.get(getUsersAPI, headers)
                .then(async response => {
                    await dispatch({ type: Types.SET_USERS_DATA, payload: await response.data });
                    await dispatch(setErrorInfo({ type: '', class: '', message: '' } ));
                })
                .catch(async error => {
                    console.log('error ,', error)
                });
        }
    };
}

export const doLogin = (username, password) => {
    return async function (dispatch, getState) {
        try {
            console.log('login api=======', loginAPI);
            await axios.post(loginAPI, {
                username: username,
                password: password
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(async function (response) {
                const userInfo = response.data.data;
                let tokenData = {
                    time: Date(),
                    firstName: userInfo.firstName,
                    lastName: userInfo.lastName,
                    email: userInfo.email,
                    role: 'admin'
                }
                const authToken = await jwt.sign(tokenData, process.env.JWT_SECRET);
                await dispatch(setAuthInformation(authToken, userInfo.token, true));

                Cookies.set('_authToken', authToken);
                Cookies.set('_serverToken', userInfo.token);
                location.replace("/dashboard");

            }).catch(async function (error) {
                console.log('error ,', error)
                await dispatch(setErrorInfo({ type: 'error', class: 'danger', message: error.response.data.message }));
            });
        } catch (error) {
            console.log('try error', error);
            await dispatch(setErrorInfo({ type: 'error', class: 'danger', message: 'Something went wrong.' }));
        }
    }
}


export const doSignUp = (userFormData) => {
    return async function (dispatch, getState) {
        try {
            console.log('signup api=======', signUpAPI);
            await axios.post(signUpAPI, userFormData, 
                {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(async function (response) {
                await dispatch(setErrorInfo({ type: 'success', class: 'success', message: response.data.message }));
            }).catch(async function (error) {
                console.log('error ,', error)
                await dispatch(setErrorInfo({ type: 'error', class: 'danger', message: error.response.data.message }));
            });
        } catch (error) {
            console.log('try error', error);
            await dispatch(setErrorInfo({ type: 'error', class: 'danger', message: 'Something went wrong.' }));
        }
    }
}
