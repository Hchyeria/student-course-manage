import { FETCH_DATA } from '../../middlewares/fetchData';

export const GET_AVG_SCORE_REQUEST = 'GET_AVG_SCORE_REQUEST';
export const GET_AVG_SCORE_SUCCESS = 'GET_AVG_SCORE_SUCCESS';
export const GET_AVG_SCORE_FAILURE = 'GET_AVG_SCORE_FAILURE';

export const getAvgSoreStudent = (sid) => dispatch =>
    dispatch({
        [FETCH_DATA]: {
            types: [GET_AVG_SCORE_REQUEST, GET_AVG_SCORE_SUCCESS, GET_AVG_SCORE_FAILURE],
            apiPath: `score/avg?sid=${sid}`
        }
    });

export const GET_CLASS_AVG_SCORE_REQUEST = 'GET_CLASS_AVG_SCORE_REQUEST';
export const GET_CLASS_AVG_SCORE_SUCCESS = 'GET_CLASS_AVG_SCORE_SUCCESS';
export const GET_CLASS_AVG_SCORE_FAILURE = 'GET_CLASS_AVG_SCORE_FAILURE';

export const getAvgSoreClass = (classId) => dispatch =>
    dispatch({
        [FETCH_DATA]: {
            types: [GET_CLASS_AVG_SCORE_REQUEST, GET_CLASS_AVG_SCORE_SUCCESS, GET_CLASS_AVG_SCORE_FAILURE],
            apiPath: `score/avg?class_id=${classId}`
        }
    });
