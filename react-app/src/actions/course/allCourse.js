import { FETCH_DATA } from '../../middlewares/fetchData';

export const GET_COURSE_REQUEST = 'GET_COURSE_REQUEST';
export const GET_COURSE_SUCCESS = 'GET_COURSE_SUCCESS';
export const GET_COURSE_FAILURE = 'GET_COURSE_FAILURE';

export const getCourse = (sid) => dispatch =>
    dispatch({
        [FETCH_DATA]: {
            types: [GET_COURSE_REQUEST, GET_COURSE_SUCCESS, GET_COURSE_FAILURE],
            apiPath: sid? `course/?sid=${sid}` : `course`
        }
    });

export const CHANGE_COURSE_REQUEST = 'CHANGE_COURSE_REQUEST';
export const CHANGE_COURSE_SUCCESS = 'CHANGE_COURSE_SUCCESS';
export const CHANGE_COURSE_FAILURE = 'CHANGE_COURSE_FAILURE';

export const changeCourse = (postData, index) => dispatch =>
    dispatch({
        [FETCH_DATA]: {
            types: [CHANGE_COURSE_REQUEST, CHANGE_COURSE_SUCCESS, CHANGE_COURSE_FAILURE],
            apiPath: `course`,
            request: {
                method: 'POST',
                body: JSON.stringify(postData),
                headers: {
                    contentType: 'application/json'
                }
            }
        }
    });

export const DELET_COURSE_REQUEST = 'DELET_COURSE_REQUEST';
export const DELET_COURSE_SUCCESS = 'DELET_COURSE_SUCCESS';
export const DELET_COURSE_FAILURE = 'DELET_COURSE_FAILURE';

export const deletCourse = (cid, index) => dispatch =>
    dispatch({
        [FETCH_DATA]: {
            types: [DELET_COURSE_REQUEST, DELET_COURSE_SUCCESS, DELET_COURSE_FAILURE],
            apiPath: `course/delet`,
            request: {
                method: 'POST',
                body: JSON.stringify({
                    cid: cid
                }),
                headers: {
                    contentType: 'application/json'
                }
            }
        }
    });


export const ADD_COURSE_REQUEST = 'ADD_COURSE_REQUEST';
export const ADD_COURSE_SUCCESS = 'ADD_COURSE_SUCCESS';
export const ADD_COURSE_FAILURE = 'ADD_COURSE_FAILURE';

export const addCourse = (data) => dispatch =>
    dispatch({
        [FETCH_DATA]: {
            types: [ADD_COURSE_REQUEST, ADD_COURSE_SUCCESS, ADD_COURSE_FAILURE],
            apiPath: `course/add`,
            request: {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    contentType: 'application/json'
                }
            }
        }
    });



export const CHANGE_COURSE_SELECT = 'CHANGE_COURSE_SELECT';


export const changeCourseSelect = (cid, isselect) => ({
    type: CHANGE_COURSE_SELECT,
    cid,
    isselect
});


export const DELET_COURSE_INFO = 'DELET_COURSE_INFO';


export const deletCourseInfo = (index) => ({
    type: DELET_COURSE_INFO,
    index
});



export const GET_COURSE_INFO_REQUEST = 'GET_COURSE_INFO_REQUEST';
export const GET_COURSE_INFO_SUCCESS = 'GET_COURSE_INFO_SUCCESS';
export const GET_COURSE_INFO_FAILURE = 'GET_COURSE_INFO_FAILURE';

export const getCourseInfo = (cid, page='') => dispatch =>
    dispatch({
        [FETCH_DATA]: {
            types: [GET_COURSE_INFO_REQUEST, GET_COURSE_INFO_SUCCESS, GET_COURSE_INFO_FAILURE],
            apiPath: page? `course/info?cid=${cid}&page=${page}` : `course/info?cid=${cid}`
        }
    });
