import * as ActionTypes from '../../actions/selection/avgScore'
import { fromJS, Map } from 'immutable';

const defaultState = fromJS({
    isFetching: false,
    classAvgScore: {},
    studentAvgScore: {},
    success: '',
    error: ''
});

const getAvgScore = (state = defaultState, action) => {
    switch (action.type) {
        case ActionTypes.GET_AVG_SCORE_REQUEST:{
            return Map({
                'isFetching': true,
                'success': false,
                'error': ''
            });
        }
        case ActionTypes.GET_AVG_SCORE_SUCCESS :
            return Map({
                'isFetching': false,
                'studentAvgScore': fromJS(action.jsonData.data),
                'success': true,
                'error': ''
            });
        case ActionTypes.GET_AVG_SCORE_FAILURE:
            return Map({
                'isFetching': false,
                'error': fromJS(action.error),
                'success': false
            });
        case ActionTypes.GET_CLASS_AVG_SCORE_REQUEST:
            return state.set('isFetching', true);
        case ActionTypes.GET_CLASS_AVG_SCORE_SUCCESS :
            return Map({
                'isFetching': false,
                'classAvgScore': fromJS(action.jsonData.data),
                'success': true,
                'error': ''
            });
        case ActionTypes.GET_CLASS_AVG_SCORE_FAILURE:
            return Map({
                'isFetching': false,
                'error': fromJS(action.error),
                'success': false
            });
        default:
            return state;
    }
};

export default getAvgScore;