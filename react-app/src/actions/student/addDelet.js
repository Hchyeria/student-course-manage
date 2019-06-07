import { FETCH_DATA } from '../../middlewares/fetchData';

export const GET_STUDENT_REQUEST = 'GET_STUDENT_REQUEST';
export const GET_STUDENT_SUCCESS = 'GET_STUDENT_SUCCESS';
export const GET_STUDENT_FAILURE = 'GET_STUDENT_FAILURE';

export const getStudent = (page) => dispatch =>{
    console.log(page)
    dispatch({
        [FETCH_DATA]: {
            types: [GET_STUDENT_REQUEST, GET_STUDENT_SUCCESS, GET_STUDENT_FAILURE],
            apiPath: page? `student?page=${page}` : `student`
        }
    });}


export const ADD_STUDENT_REQUEST = 'ADD_STUDENT_REQUEST';
export const ADD_STUDENT_SUCCESS = 'ADD_STUDENT_SUCCESS';
export const ADD_STUDENT_FAILURE = 'ADD_STUDENT_FAILURE';

export const addStudent = (data) => dispatch =>
    dispatch({
        [FETCH_DATA]: {
            types: [ADD_STUDENT_REQUEST, ADD_STUDENT_SUCCESS, ADD_STUDENT_FAILURE],
            apiPath: `student/add`,
            request: {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    contentType: 'application/json'
                }
            }
        }
    });

export const DELET_STUDENT_REQUEST = 'DELET_STUDENT_REQUEST';
export const DELET_STUDENT_SUCCESS = 'DELET_STUDENT_SUCCESS';
export const DELET_STUDENT_FAILURE = 'DELET_STUDENT_FAILURE';

export const deletStudent = (sid) => dispatch =>
    dispatch({
        [FETCH_DATA]: {
            types: [DELET_STUDENT_REQUEST, DELET_STUDENT_SUCCESS, DELET_STUDENT_FAILURE],
            apiPath: `student/delet`,
            request: {
                method: 'POST',
                body: JSON.stringify({
                    sid: sid
                }),
                headers: {
                    contentType: 'application/json'
                }
            }
        }
    });

export const DELET_STUDENT_LIST = 'DELET_STUDENT_LIST'

export const deletStudentList = (index) => ({
    type: DELET_STUDENT_LIST,
    index
})
          