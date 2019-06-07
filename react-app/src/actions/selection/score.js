import { FETCH_DATA } from '../../middlewares/fetchData';

export const GET_COURSE_SCORE_REQUEST = 'GET_COURSE_SCORE_REQUEST';
export const GET_COURSE_SCORE_SUCCESS = 'GET_COURSE_SCORE_SUCCESS';
export const GET_COURSE_SCORE_FAILURE = 'GET_COURSE_SCORE_FAILURE';

export const getCourseSore = (cid) => dispatch =>
    dispatch({
        [FETCH_DATA]: {
            types: [GET_COURSE_SCORE_REQUEST, GET_COURSE_SCORE_SUCCESS, GET_COURSE_SCORE_FAILURE],
            apiPath: `score/info?cid=${cid}`
        }
    });

export const GET_CLASS_SCORE_REQUEST = 'GET_CLASS_SCORE_REQUEST';
export const GET_CLASS_SCORE_SUCCESS = 'GET_CLASS_SCORE_SUCCESS';
export const GET_CLASS_SCORE_FAILURE = 'GET_CLASS_SCORE_FAILURE';

export const getClassSore= (classId) => dispatch =>
    dispatch({
        [FETCH_DATA]: {
            types: [GET_CLASS_SCORE_REQUEST, GET_CLASS_SCORE_SUCCESS, GET_CLASS_SCORE_FAILURE],
            apiPath: `score/info?class_id=${classId}`
        }
    });
