// callApi middleware.
// refer to https://github.com/reactjs/redux/tree/master/examples/real-world for more comments
// refer to https://github.com/froyog/bbs-fed-redux/ for more comments

import { camelizeKeys, decamelizeKeys } from 'humps'

export const FETCH_DATA = 'FETCH_DATA ';

let API_ROOT;

if (process.env.NODE_ENV === 'production') {
    API_ROOT = 'https://Hchyeria.com/api';
} else if (process.env.NODE_ENV === 'development') {
    API_ROOT = 'http://localhost:2333/api';
}


const fetchData = (apiPath, request = {}, state = {}) => {
    const url = `${API_ROOT}/${apiPath}`;
    const { headers, body, method } = request;
    let customRequest = {};
    if (method) {
        customRequest.method = method.toUpperCase();
    }
    if (body) {
        customRequest.body = JSON.stringify(decamelizeKeys(JSON.parse(body)));
    }
    if (headers) {
        const { contentType} = headers;
        customRequest.headers = {};

        if (contentType) {
            customRequest.headers['Content-Type'] = contentType;
        }
    }
    return (
        fetch(url, customRequest)
            .then(res => res.json().then(json => {
        
                if (!json.status) {
                    return Promise.reject(json);
                }
                const camelizedJsondata = camelizeKeys(json);
                return camelizedJsondata;
                }
            ))
    );
};


export default store => next => action => {
    const callAPI = action[FETCH_DATA];
    if (typeof callAPI === 'undefined') {
        return next(action);
    }
    let { apiPath, types, request } = callAPI;

    if (typeof apiPath !== 'string') {
        throw new Error('Specify a string apiPath URL.');
    }
    if (!Array.isArray(types) || types.length !== 3) {
        throw new Error('Expected an array of three action types');
    }
    if (!types.every(type => typeof type === 'string')) {
        throw new Error('Expected action types to be strings.');
    }

    const actionWith = data => {
        const finalAction = Object.assign({}, action, data);
        delete finalAction[FETCH_DATA];
        return finalAction;
    };

    const [ requestType, successType, failureType ] = types;
    next(actionWith({ type: requestType }));
    return fetchData(apiPath, request, store.getState()).then(
        response =>next(actionWith({
            jsonData: response,
            type: successType
        })),
        error => next(actionWith({
            type: failureType,
            error: error.message || '网络连接错误'
        }))
        )
        .catch(error =>{
            console.log(error)
        })

};
