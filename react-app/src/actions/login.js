import { FETCH_DATA } from '../middlewares/fetchData';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export const login = (sid, sname) => dispatch =>
    dispatch({
        [FETCH_DATA]: {
            types: [LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE],
            apiPath: 'login',
            request: {
                method: 'POST',
                body: JSON.stringify({
                    sid: sid,
                    sname: sname
                }),
                headers: {
                    contentType: 'application/json'
                }
            }
        }
    });