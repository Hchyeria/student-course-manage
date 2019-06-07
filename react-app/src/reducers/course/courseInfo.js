import _ from 'lodash';
import { fromJS, Map } from 'immutable';
import * as ActionTypes from '../../actions/course/allCourse';

const defaultState = fromJS({
    isFetching: false,
    courseInfo: {},
    error: ''
});

const courseInfo = (state = defaultState, action) => {
    switch (action.type) {
        case ActionTypes.GET_COURSE_INFO_REQUEST:
            return state.set('isFetching', true);
        case ActionTypes.GET_COURSE_INFO_SUCCESS :
            return Map({
                'isFetching': false,
                'courseInfo': fromJS(action.jsonData.data),
                'error': ''
            });
        case ActionTypes.GET_COURSE_INFO_FAILURE:
            return Map({
                ...state,
                'isFetching': false,
                'error': fromJS(action.error)
            });
        default:
            return state;
    }
};

export default courseInfo;