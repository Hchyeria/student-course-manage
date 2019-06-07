import { fromJS, Map } from 'immutable';
import * as ActionTypes from '../actions/login';
import * as studentActionTypes from '../actions/student/info'

const defaultState = fromJS({
    isFetching: false,
    success: false,
    error: '',
    student: {}
});

const Login = (state = defaultState, action) => {
    switch (action.type) {
        case ActionTypes.LOGIN_REQUEST:
            return state.set('isFetching', true);
        case ActionTypes.LOGIN_SUCCESS:
            return Map({
                'isFetching': false,
                'success': true,
                'error': '',
                'student': fromJS(action.jsonData.data)
            })
        case ActionTypes.LOGIN_FAILURE:{
            return Map({
                'isFetching': false,
                'success': false,
                'error': fromJS(action.error)
            })}
        case studentActionTypes.CHANGE_STUDENT_INFO_REQUEST:
            return state.set('isFetching', true);
        case studentActionTypes.CHANGE_STUDENT_INFO_SUCCESS:
            return state.get('student').merge(fromJS(action.jsonData.data));
        case studentActionTypes.CHANGE_STUDENT_INFO_FAILURE:
            return Map({
                'isFetching': false,
                'error': fromJS(action.error)
            })
        default:
            return state;
    }
};

export default Login;
