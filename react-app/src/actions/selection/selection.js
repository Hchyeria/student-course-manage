import { FETCH_DATA } from '../../middlewares/fetchData';

export const CHANGE_SELETION_REQUEST = 'CHANGE_SELETION_REQUEST';
export const CHANGE_SELETION_SUCCESS = 'CHANGE_SELETION_SUCCESS';
export const CHANGE_SELETION_FAILURE = 'CHANGE_SELETION_FAILURE';

export const changeSelection = (data) => dispatch =>
    dispatch({
        [FETCH_DATA]: {
            types: [CHANGE_SELETION_REQUEST, CHANGE_SELETION_SUCCESS, CHANGE_SELETION_FAILURE],
            apiPath: `selection`,
            request: {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    contentType: 'application/json'
                }
            }
        }
    });


export const ADD_SELETION_REQUEST = 'ADD_SELETION_REQUEST';
export const ADD_SELETION_SUCCESS = 'ADD_SELETION_SUCCESS';
export const ADD_SELETION_FAILURE = 'ADD_SELETION_FAILURE';

export const addSelection = (data) => dispatch =>
    dispatch({
        [FETCH_DATA]: {
            types: [ADD_SELETION_REQUEST, ADD_SELETION_SUCCESS, ADD_SELETION_FAILURE],
            apiPath: `selection/add`,
            request: {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    contentType: 'application/json'
                }
            }
        }
    });

export const DELET_SELETION_REQUEST = 'DELET_SELETION_REQUEST';
export const DELET_SELETION_SUCCESS = 'DELET_SELETION_SUCCESS';
export const DELET_SELETION_FAILURE = 'DELET_SELETION_FAILURE';

export const deletSelection = (data) => dispatch =>
    dispatch({
        [FETCH_DATA]: {
            types: [DELET_SELETION_REQUEST, DELET_SELETION_SUCCESS, DELET_SELETION_FAILURE],
            apiPath: `selection/delet`,
            request: {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    contentType: 'application/json'
                }
            }
        }
    });


export const DELET_SELETION_INFO = 'DELET_SELETION_INFO ';
export const deletSelectionInfo = (cid) =>({
    type: DELET_SELETION_INFO,
    cid 
});
