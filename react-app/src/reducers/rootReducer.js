import { combineReducers } from 'redux-immutable';
import { fromJS, Map } from 'immutable';
import loginList from './login';
import studentInfo from './student/info';
import changeCourse from './course/changeCourse'
import changeStudentList from './student/addDelet'
import changeSelectionList from './selection/selection'
import score from './selection/score'
import courseInfo from './course/courseInfo'
import getAvgScore from './selection/avgScore'
import search from './common/search'



const combinedReducer = combineReducers({
    loginList,
    studentInfo,
    courseInfo,
    changeCourse,
    changeStudentList,
    changeSelectionList,
    getAvgScore,
    score,
    search
});





const rootReducer = (state, action) => {
    const intermediateState = combinedReducer(state, action);
    return intermediateState;
};

export default rootReducer;
