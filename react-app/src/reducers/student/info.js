import _ from 'lodash';
import { fromJS, Map } from 'immutable';
import * as ActionTypes from '../../actions/student/info';
import * as TableActionTypes from '../../actions/common/table';
import * as SelectionActionTypes from '../../actions/selection/selection';

const defaultState = fromJS({
    isFetching: false,
    studentInfo: {},
    error: ''
});

const StudentInfo = (state = defaultState, action) => {
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
                    return val.get(action.clickedColumn)
                  })
                )
            }
            return state.setIn(['studentInfo', 'selectInfo'], state.getIn(['studentInfo', 'selectInfo']).reverse())
        }
        case SelectionActionTypes.DELET_SELETION_INFO:{
            return state.setIn(['studentInfo', 'selectInfo'], 
                state.getIn(['studentInfo', 'selectInfo']).filter((val)=> {
                   return val.get('cid') !== (+action.cid[0])
                })
                )
        }
        default:
            return state;
    }
};



export default StudentInfo;