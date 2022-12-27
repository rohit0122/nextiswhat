import getConfig from "next/config";
import Cookies from 'js-cookie';

/**
 * 
 * @param {*} token 
 * @param {*} tokenFromCookies 
 * @returns json response
 */
export const getHeaders = (token = null, tokenFromCookies = false) => {
    let headerInfo = {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    }
    if (token) {
        headerInfo.headers['Authorization'] = 'Bearer ' + token;
    } else if (tokenFromCookies) {
        headerInfo.headers['Authorization'] = Cookies.get('_serverToken');
    }
    return headerInfo;
}

/**
 *  API Routes
 */
const { publicRuntimeConfig } = getConfig();
export const { API_BASE_PATH } = publicRuntimeConfig;
export const loginAPI = API_BASE_PATH + 'login'
export const getUsersAPI = API_BASE_PATH + 'users';
export const signUpAPI = API_BASE_PATH + 'signup'