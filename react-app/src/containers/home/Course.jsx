import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Dynamic from './../../components/echarts/Dynamic'
import TransitionablePortal from './../../containers/common/TransitionablePortal'
import SortableTable from './../common/SortableTable';
import { getCourse } from '../../actions/course/allCourse'
import { sortTablbe } from '../../actions/common/table'
import {  toJS } from './../../utils'

const courseDataKey = {
    cid: '课程编号',
    cname: '课程名称',
    teacherName: '授课教师',
    suitGrade: '适合年级',
    cancelYear: '取消年份',
    isselect: '选课情况'
}

class Course extends Component{
    static propTypes = {
        selectInfo: PropTypes.array.isRequired
    };
    static defaultProps = {
        selectInfo: []
    }

    componentWillMount() {
        const {  getAllCourse } = this.props
        const { sid, sname } = JSON.parse(localStorage.getItem('student'))
        getAllCourse(sid)
    }
    
    render(){
        const { allCourse, sortTablbe, selectInfo } = this.props
        const { match: { params: { keyword, page } }, search } = this.props;
        let coursepaths = /\/course\/(\d+)\/?$/.exec(window.location.pathname);
        return(
            <div>
                <TransitionablePortal></TransitionablePortal>
                <div className="center-card">
                  { selectInfo && selectInfo.length?
                  <Dynamic selectInfo={ selectInfo }></Dynamic> : ''
                  }
              
                </div>
                <SortableTable 
                    sortTablbe={ sortTablbe }
                    tableData= { allCourse }
                    dataKey={ courseDataKey }
                    iseditable={false}
                    isAdd= {true}
                >
                </SortableTable>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    selectInfo: state.getIn(['studentInfo', 'studentInfo', 'selectInfo']),
    allCourse: state.getIn(['changeCourse', 'courseList'])
});
const mapDispatchToProps = dispatch => ({
    sortTablbe: (clickedColumn, data, column) => dispatch(sortTablbe(clickedColumn, data, column)),
    getAllCourse: (sid) => dispatch(getCourse(sid))
});

Course = connect(mapStateToProps, mapDispatchToProps)(toJS(Course));

export default Course;
