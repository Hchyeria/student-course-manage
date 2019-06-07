import { FETCH_DATA } from '../../middlewares/fetchData';

export const GET_STUDENT_INFO_REQUEST = 'GET_STUDENT_INFO_REQUEST';
export const GET_STUDENT_INFO_SUCCESS = 'GET_STUDENT_INFO_SUCCESS';
export const GET_STUDENT_INFO_FAILURE = 'GET_STUDENT_INFO_FAILURE';

export const getStudentInfo = (sid, sname) => dispatch =>
    dispatch({
        [FETCH_DATA]: {
            types: [GET_STUDENT_INFO_REQUEST, GET_STUDENT_INFO_SUCCESS, GET_STUDENT_INFO_FAILURE],
            apiPath: sid? `student/info?sid=${sid}` : `student/info?sname=${sname}`
        }
    });

export const CHANGE_STUDENT_INFO_REQUEST = 'CHANGE_STUDENT_INFO_REQUEST';
export const CHANGE_STUDENT_INFO_SUCCESS = 'CHANGE_STUDENT_INFO_SUCCESS';
export const CHANGE_STUDENT_INFO_FAILURE = 'CHANGE_STUDENT_INFO_FAILURE';

export const changeStudentInfo = (postdata) => dispatch =>
    dispatch({
        [FETCH_DATA]: {
            types: [CHANGE_STUDENT_INFO_REQUEST, CHANGE_STUDENT_INFO_SUCCESS, CHANGE_STUDENT_INFO_FAILURE],
            apiPath: `student`,
            request: {
                method: 'POST',
                body: JSON.stringify(postdata),
                headers: {
                    contentType: 'application/json'
                }
            }
        }
    });