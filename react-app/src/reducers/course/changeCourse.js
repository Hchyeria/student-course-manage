import * as ActionTypes from '../../actions/course/allCourse'
import { fromJS, Map } from 'immutable';
const defaultState = fromJS({
    isFetching: false,
    courseList: [],
    success: '',
    error: ''
});


const changeCourse = (state = defaultState, action) => {
    switch (action.type) {
        case ActionTypes.GET_COURSE_REQUEST:
            return state.set('isFetching', true);
        case ActionTypes.GET_COURSE_SUCCESS :
            return Map({
                'isFetching': false,
                'courseList': fromJS(action.jsonData.data),
                'error': ''
            });
        case ActionTypes.GET_COURSE_FAILURE:
            return Map({
                'isFetching': false,
                'error': fromJS(action.error),
                'courseList': state.get('courseList'),
                'success': false
            });
        case ActionTypes.CHANGE_COURSE_REQUEST:
            return Map({
                'isFetching': true,
                'success': false,
                'courseList': state.get('courseList'),
                'error': ''
            });
        case ActionTypes.CHANGE_COURSE_SUCCESS:{
            if(!action.index){
                return Map({
                    'isFetching': false,
                    'success': fromJS(action.jsonData.data),
                    'error': '',
                    'courseList': state.get('courseList'),
                })
            }
            return Map({
                'isFetching': false,
                'success': state.getIn(['courseList', action.index]).merge(fromJS(action.jsonData.data)),
                'error': ''
            })
        };
        case ActionTypes.CHANGE_COURSE_FAILURE:
            return Map({
                'isFetching': false,
                'error': fromJS(action.error),
                'courseList': state.get('courseList'),
                'success': false
            });
        case ActionTypes.DELET_COURSE_REQUEST:
            return state.set('isFetching', true);
        case ActionTypes.DELET_COURSE_SUCCESS :{
            return Map({
                'isFetching': false,
                'success': fromJS(action.jsonData.data),
                'courseList': state.get('courseList'),
                'error': false
            });
        }
            
        case ActionTypes.DELET_COURSE_FAILURE:
            return Map({
                'isFetching': false,
                'error': fromJS(action.error),
                'courseList': state.get('courseList'),
                'success': false
            });
       case ActionTypes.CHANGE_COURSE_SELECT:{
           let i;
            state.get('courseList').forEach((val, index) =>{
                if(val.get('cid') === +action.cid[0]){
                    i = index;
                }
            })
            return state.setIn(['courseList', i, 'isselect'], +action.isselect);
        }
        case ActionTypes.DELET_COURSE_INFO:{
            return state.deleteIn(['courseList', +action.index]);
        }
        case ActionTypes.ADD_COURSE_REQUEST:
            return Map({
                'isFetching': true,
                'error': '',
                'courseList': state.get('courseList'),
                'success': false
            });
       case ActionTypes.ADD_COURSE_SUCCESS:{
            return Map({
                'isFetching': true,
                'error': '',
                'courseList': state.get('courseList'),
                'success': true
            });
       }
       case ActionTypes.ADD_COURSE_FAILURE:{
            return Map({
                'isFetching': false,
                'error': fromJS(action.error),
                'courseList': state.get('courseList'),
                'success': false
            });
        }
        default:
            return state;
    }
};

export default changeCourse;