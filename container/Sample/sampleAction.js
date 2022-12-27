import * as Types from './sampleTypes';
import { setErrorInfo } from '../Page/pageActions';

export const setSampleData = () => {
    return async function (dispatch, getState) {
        /* Sample axios call 

        const token = requestObj.cookies?._serverToken || null;
        const headers = getHeaders(token);
        await axios.get(getUsersAPI, headers)
            .then(async response => {
                await dispatch({ type: Types.SET_USERS_DATA, payload: await response.data });
                await dispatch({ type: Types.SET_ERROR_INFO, payload: { type: '', class: '', message: '' } });
            })
            .catch(async error => {
                console.log('error ,', error)
            });
        */
        await dispatch({ type: Types.SET_SAMPLE_DATA, payload: { "name": "John", "age": 30, "car": "Audi" } });
        await dispatch(setErrorInfo( { type: '', class: '', message: '' }));
    };
}