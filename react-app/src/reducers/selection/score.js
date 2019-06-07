import * as ActionTypes from '../../actions/selection/score'
import { fromJS, Map } from 'immutable';

const defaultState = fromJS({
    isFetching: false,
    classScore: {},
    courseScore: {},
    success: '',
    error: ''
});

const score = (state = defaultState, action) => {
    switch (action.type) {
        case ActionTypes.GET_COURSE_SCORE_REQUEST:{
            return Map({
                'isFetching': true,
                'success': false,
                'error': ''
            });
        }
        case ActionTypes.GET_COURSE_SCORE_SUCCESS :
            return Map({
                'isFetching': false,
                'courseScore': fromJS(action.jsonData.data),
                'success': true,
                'error': ''
            });
        case ActionTypes.GET_COURSE_SCORE_FAILURE:
            return Map({
                ...state,
                'isFetching': false,
                'error': fromJS(action.error),
                'success': false
            });
        case ActionTypes.GET_CLASS_SCORE_REQUEST:
            return state.set('isFetching', true);
        case ActionTypes.GET_CLASS_SCORE_SUCCESS :
            return Map({
                'isFetching': false,
                'classScore': fromJS(action.jsonData.data),
                'success': true,
                'error': ''
            });
        case ActionTypes.GET_CLASS_SCORE_FAILURE:
            return Map({
                ...state,
                'isFetching': false,
                'error': fromJS(action.error),
                'success': false
            });
        default:
            return state;
    }
};

export default score;