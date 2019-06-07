import * as ActionTypes from '../../actions/selection/selection'
import { fromJS, Map } from 'immutable';

const defaultState = fromJS({
    isFetching: false,
    success: '',
    error: ''
});

const changeSelectionList = (state = defaultState, action) => {
    switch (action.type) {
        case ActionTypes.CHANGE_SELETION_REQUEST:{
            state.set('isFetching', true);
            return state.set('success', false);
        }
        case ActionTypes.CHANGE_SELETION_SUCCESS :
            return Map({
                'isFetching': false,
                'success': fromJS(action.jsonData.data),
                'error': ''
            });
        case ActionTypes.CHANGE_SELETION_FAILURE:
            return Map({
                'isFetching': false,
                'error': fromJS(action.error),
                'success': false
            });
        case ActionTypes.ADD_SELETION_REQUEST:
            return Map({
                'isFetching': true,
                'success': false,
                'error': ''
            });
        case ActionTypes.ADD_SELETION_SUCCESS :
            return Map({
                'isFetching': false,
                'success': fromJS(action.jsonData.data),
                'error': ''
            });
        case ActionTypes.ADD_SELETION_FAILURE:
            return Map({
                'isFetching': false,
                'error': fromJS(action.error),
                'success': false
            });
        case ActionTypes.DELET_SELETION_REQUEST:
            return Map({
                'isFetching': true,
                'success': false,
                'error': ''
            });
        case ActionTypes.DELET_SELETION_SUCCESS :
            return Map({
                'isFetching': false,
                'success': fromJS(action.jsonData.data),
                'error': ''
            });
        case ActionTypes.DELET_SELETION_FAILURE:
            return Map({
                'isFetching': false,
                'error': fromJS(action.error),
                'success': false
            });
        default:
            return state;
    }
};

export default changeSelectionList;