import _ from 'lodash';
import { fromJS, Map } from 'immutable';
import * as ActionTypes from '../../actions/common/search';

const defaultState = fromJS({
    isFetching: false,
    searchRes: {},
    error: ''
});

const search = (state = defaultState, action) => {
    switch (action.type) {
        case ActionTypes.SEARCG_SCORE_REQUEST:
            return state.set('isFetching', true);
        case ActionTypes.SEARCG_SCORE_SUCCESS :
            return Map({
                'isFetching': false,
                'searchRes': fromJS(action.jsonData.data),
                'error': ''
            });
        case ActionTypes.SEARCG_SCORE_FAILURE:
            return Map({
                'isFetching': false,
                'error': fromJS(action.error)
            });
        default:
            return state;
    }
};

export default search