import { fromJS, Map, List } from 'immutable';
import * as ActionTypes from '../../actions/student/addDelet'
import * as changeActionTypes from '../../actions/student/info'
const defaultState = fromJS({
    isFetching: false,
    studentList: [],
    success: '',
    error: ''
});

const changeStudentList = (state = defaultState, action) => {
    switch (action.type) {
        case ActionTypes.GET_STUDENT_REQUEST:
            return state.set('isFetching', true);
        case ActionTypes.GET_STUDENT_SUCCESS :{
            return Map({
                'isFetching': false,
                'studentList': fromJS(action.jsonData.data),
                'success': true,
                'error': ''
            });}
        case ActionTypes.GET_STUDENT_FAILURE:
            return Map({
                'isFetching': false,
                'error': fromJS(action.error),
                'success': false
            });
        case ActionTypes.ADD_STUDENT_REQUEST:
            return state.set('isFetching', true);
        case ActionTypes.ADD_STUDENT_SUCCESS :{

            return Map({
                'isFetching': false,
                'studentList': state.get('studentList').push(fromJS(action.jsonData.data)),
                'success': true,
                'error': ''
            });}
        case ActionTypes.ADD_STUDENT_FAILURE:
            return Map({
                'isFetching': false,
                'error': fromJS(action.error),
                'studentList': state.get('studentList'),
                'success': false
            });
        case ActionTypes.DELET_STUDENT_REQUEST:
            return state.set('isFetching', true);
        case ActionTypes.DELET_STUDENT_SUCCESS :
            return Map({
                'isFetching': false,
                'studentList': state.get('studentList').filter((val)=>{
                        return val.get('sid') !== (+action.jsonData.data.sid)
                  }),
                'error': ''
            });
        case ActionTypes.DELET_STUDENT_FAILURE:
            return Map({
                'isFetching': false,
                'error': fromJS(action.error),
                'studentList': state.get('studentList'),
                'success': false
            });
        case changeActionTypes.CHANGE_STUDENT_INFO_REQUEST:
            return state.set('isFetching', true);
        case changeActionTypes.CHANGE_STUDENT_INFO_SUCCESS :
            return Map({
                'isFetching': false,
                'studentList': state.get('studentList'),
                'success': true,
                'error': ''
            });
        case changeActionTypes.CHANGE_STUDENT_INFO_FAILURE:
            return Map({
                'studentList': state.get('studentList'),
                'isFetching': false,
                'error': fromJS(action.error),
                'success': false
            });
        default:
            return state;
    }
};

export default changeStudentList;