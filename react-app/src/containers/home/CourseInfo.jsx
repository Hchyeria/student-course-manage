import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import Events from './../../components/echarts/Events'
import TransitionablePortal from '../common/TransitionablePortal'
import SortableTable from '../common/SortableTable';
import { getCourse, getCourseInfo } from '../../actions/course/allCourse'
import { getCourseSore } from '../../actions/selection/score'
import { filterSelectInfo, toJS } from '../../utils'

const courseSelectInfoDataKey = {
    sid: '学号',
    sname: '姓名',
    gender: '性别',
    entranceYear: '年级',
    classId: '班级',
    slectionInfo: '选课情况'
}
const keys = ['satrt', 'fraction']

class CourseInfo extends Component{
  

    componentWillMount() {
        const {  getCourseInfo, getCourseSore } = this.props
        const { match: { params: { key, cid } }, search } = this.props;
        getCourseInfo(cid)
        getCourseSore(cid)
    }
    
    render(){
        const { courseInfo, courseScoreInfo, getCourseInfo } = this.props
        const { match: { params: { keyword, cid } }, search } = this.props;
        let coursepaths = /\/course\/(\d+)\/?$/.exec(window.location.pathname);
        if(courseInfo && courseScoreInfo){
            return(
                <div>
                <TransitionablePortal></TransitionablePortal>
                <Events 
                    selectInfo= { filterSelectInfo(courseScoreInfo['data'] , keys ) } 
                    totalAvg={  courseScoreInfo.total }
                    keys={ keys }
                    text={ '课程各区段成绩分布' }
                    subtext= {  `选课总人数为 ${ courseScoreInfo.total }` }
                    isScore= {true}
                >
                </Events>
                <SortableTable 
                    tableData= {  courseInfo }
                    dataKey={ courseSelectInfoDataKey }
                    iseditable={false}
                    isAdd= {true}
                    isStudent={true}
                    isCourse={true}
                    getCourseInfo= { getCourseInfo }
                    cid={cid }
                />
            </div>
            )

        }
        return(
            <div></div>
        );
    }
}

const mapStateToProps = state => ({
    courseScoreInfo: state.getIn(['score', 'courseScore']),
    courseInfo: state.getIn(['courseInfo', 'courseInfo', 'selectInfo'])
});
const mapDispatchToProps = dispatch => ({
    getCourseInfo: (cid, page) => dispatch(getCourseInfo(cid, page)),
    getCourseSore: (cid) => dispatch(getCourseSore(cid))
});

CourseInfo = connect(mapStateToProps, mapDispatchToProps)(toJS(CourseInfo));

export default CourseInfo;
