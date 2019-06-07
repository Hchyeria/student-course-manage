import { FETCH_DATA } from '../../middlewares/fetchData';

export const SEARCG_STUDENT_REQUEST = 'SEARCG_STUDENT_REQUEST';
export const SEARCG_STUDENT_SUCCESS = 'SEARCG_STUDENT_SUCCESS';
export const SEARCG_STUDENT_FAILURE = 'SEARCG_STUDENT_FAILURE';

export const getCourse = (data) => dispatch =>
    dispatch({
        [FETCH_DATA]: {
            types: [SEARCG_STUDENT_REQUEST, SEARCG_STUDENT_SUCCESS, SEARCG_STUDENT_FAILURE],
            apiPath: `course`,
            request: {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    contentType: 'application/json'
                }
            }
        }
    });

export const SEARCG_SCORE_REQUEST = 'SEARCG_SCORE_REQUEST';
export const SEARCG_SCORE_SUCCESS = 'SEARCG_SCORE_SUCCESS';
export const SEARCG_SCORE_FAILURE = 'SEARCG_SCORE_FAILURE';

export const searchScore = (postData, index) => dispatch =>
    dispatch({
        [FETCH_DATA]: {
            types: [SEARCG_SCORE_REQUEST, SEARCG_SCORE_SUCCESS, SEARCG_SCORE_FAILURE],
            apiPath: `score`,
            request: {
                method: 'POST',
                body: JSON.stringify(postData),
                headers: {
                    contentType: 'application/json'
                }
            }
        }
    });