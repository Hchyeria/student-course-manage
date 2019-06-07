import _ from 'lodash';
import { fromJS, Map } from 'immutable';
import * as ActionTypes from '../../actions/student/info';
import * as TableActionTypes from '../../actions/common/table';

const defaultState = fromJS({
    isFetching: false,
    studentInfo: {},
    error: ''
});

const getStudentInfo = (state = defaultState, action) => {
    console.log(action)
    switch (action.type) {
        case ActionTypes.GET_STUDENT_INFO_REQUEST:
            return state.set('isFetching', true);
        case ActionTypes.GET_STUDENT_INFO_SUCCESS :
            return Map({
                'isFetching': false,
                'studentInfo': fromJS(action.jsonData.data),
                'error': ''
            });
        case ActionTypes.GET_STUDENT_INFO_FAILURE:
            return Map({
                'isFetching': false,
                'error': fromJS(action.error)
            });
        case TableActionTypes.TABLE_SORT:{
            if (action.column !== action.clickedColumn){ 
                return state.setIn(['studentInfo', 'selectInfo'], 
                        state.getIn(['studentInfo', 'selectInfo']).sortBy((val,index,obj)=>{
                            console.log(val.get(action.clickedColumn))
                        return val.get(action.clickedColumn)
                        })
                )
            }
            return state.setIn(['studentInfo', 'selectInfo'], state.getIn(['studentInfo', 'selectInfo']).reverse())
        }
        default:
            return state;
    }
};

export default getStudentInfo;